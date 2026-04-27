import { GoogleGenerativeAI } from '@google/generative-ai'

// ---------------------------------------------------------------------------
// Initialise Gemini 1.5 Flash
// API key comes from .env.local → VITE_GEMINI_API_KEY
// ---------------------------------------------------------------------------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'GEMINI_API_KEY_PLACEHOLDER'

let model = null

function getModel() {
  if (!model && API_KEY) {
    console.log('[Annam AI] Initializing with key:', API_KEY.substring(0, 7) + '...')
    const genAI = new GoogleGenerativeAI(API_KEY)
    model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
  }
  return model
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Calls Gemini with a 5-second timeout. Falls back to `fallback` on any error.
 */
async function safeGenerate(prompt, fallback) {
  const m = getModel()
  if (!m) return fallback

  try {
    const result = await Promise.race([
      m.generateContent(prompt),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Gemini timeout')), 15000)
      ),
    ])
    return result.response.text().trim()
  } catch (err) {
    console.warn('[Gemini] Fallback triggered:', err.message)
    return fallback
  }
}

/**
 * Parses a JSON string returned by Gemini safely.
 */
function parseJSON(text, fallback) {
  try {
    const cleaned = text.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch {
    return fallback
  }
}

// ---------------------------------------------------------------------------
// 1. explainFood — "Why This?" card reasoning
// ---------------------------------------------------------------------------
/**
 * @param {Object} food  - food item from dataset
 * @param {string} goal  - user's selected goal
 * @returns {Promise<string>}
 */
export async function explainFood(food, goal) {
  const prompt = `
You are EatSmart, a friendly nutritionist AI.

A user with the goal of "${goal}" is considering eating "${food.name}".
It has ${food.calories} calories and ${food.protein}g of protein.
Its health score is ${food.healthScore}.

In 1–2 short sentences, explain why this food is a good (or not ideal) choice for their goal.
Be encouraging, specific, and practical. No bullet points. Plain text only.
`.trim()

  return safeGenerate(prompt, food.reason)
}

// ---------------------------------------------------------------------------
// 2. explainSwap — Swap suggestion reasoning
// ---------------------------------------------------------------------------
/**
 * @param {Object} food  - original food item
 * @param {Object} swap  - swap object from food.alternatives[0]
 * @param {string} goal  - user's selected goal
 * @returns {Promise<string>}
 */
export async function explainSwap(food, swap, goal) {
  const prompt = `
You are EatSmart, a practical nutrition AI.

A user with goal "${goal}" is eating "${food.name}" (${food.calories} cal).
Suggest they try "${swap.name}" instead (${swap.calories} cal), saving ${swap.caloriesSaved} calories.

Write one punchy sentence explaining WHY this swap is better for their goal.
Start with "Try" or "Switch to". Keep it under 25 words. Plain text only.
`.trim()

  const fallback = `Switch to ${swap.name} — ${swap.improvement}.`
  return safeGenerate(prompt, fallback)
}

// ---------------------------------------------------------------------------
// 3. scanFood — Analyze any typed food name
// ---------------------------------------------------------------------------
/**
 * @param {string} foodName - user-typed food name
 * @returns {Promise<{ calories: number|string, healthScore: string, alternative: string, reason: string }>}
 */
export async function scanFood(foodName) {
  // Security: Basic input sanitization to prevent prompt injection or malicious input
  const sanitizedInput = foodName.trim().substring(0, 100).replace(/[<>]/g, '')
  
  if (!sanitizedInput) return null

  const fallback = {
    calories: 'Unknown',
    healthScore: 'Yellow',
    alternative: 'Try a fruit or roasted chana',
    reason: "Couldn't analyze this food — try a common Indian food name.",
  }

  const prompt = `
You are EatSmart, a nutrition AI focused on Indian food habits.

The user typed: "${foodName}"

Return a JSON object with exactly these fields:
{
  "calories": <estimated calories as a number for a standard Indian serving>,
  "healthScore": <"Green", "Yellow", or "Red" based on nutrition quality>,
  "alternative": <name of one healthier Indian food alternative>,
  "reason": <one sentence explaining why the alternative is better>
}

Rules:
- Green = nutritious, low-cal, high protein or fiber
- Yellow = moderate, okay occasionally  
- Red = high-cal, low nutrition, processed
- Be realistic about Indian portion sizes
- Return ONLY valid JSON. No markdown. No explanation outside JSON.
`.trim()

  const text = await safeGenerate(prompt, null)
  if (!text) return fallback
  return parseJSON(text, fallback)
}

// ---------------------------------------------------------------------------
// 4. planSummary — Daily plan AI narrative
// ---------------------------------------------------------------------------
/**
 * @param {Object} meals          - { breakfast, lunch, dinner, snack }
 * @param {string} goal           - user's goal
 * @param {number} totalCalories  - total day calories
 * @param {number} totalProtein   - total day protein
 * @returns {Promise<string>}
 */
export async function planSummary(meals, goal, totalCalories, totalProtein) {
  const names = {
    breakfast: meals.breakfast?.name ?? 'Not set',
    lunch: meals.lunch?.name ?? 'Not set',
    dinner: meals.dinner?.name ?? 'Not set',
    snack: meals.snack?.name ?? 'Not set',
  }

  const prompt = `
You are EatSmart, a nutrition coach AI.

A user with the goal of "${goal}" has this meal plan for the day:
- Breakfast: ${names.breakfast} (${meals.breakfast?.calories ?? 0} cal)
- Lunch: ${names.lunch} (${meals.lunch?.calories ?? 0} cal)
- Dinner: ${names.dinner} (${meals.dinner?.calories ?? 0} cal)
- Snack: ${names.snack} (${meals.snack?.calories ?? 0} cal)

Total: ${totalCalories} calories | ${totalProtein}g protein

Write 2 motivating sentences summarizing this plan and how it supports their goal.
Be specific about the foods. Sound like a coach, not a robot. Plain text only.
`.trim()

  const fallback = `Your plan is tailored to your ${goal} goal with ${totalCalories} total calories and ${totalProtein}g of protein. Stick to it for best results!`
  return safeGenerate(prompt, fallback)
}

// ---------------------------------------------------------------------------
// 5. insightNarrative — Behavior insight blurbs
// ---------------------------------------------------------------------------
/**
 * @param {Object} weekData - { greenCount, yellowCount, redCount, bestDay, improvementPercent, worstPattern }
 * @returns {Promise<string[]>}  - array of 3 insight strings
 */
export async function insightNarrative(weekData) {
  const fallback = [
    `You improved your food choices by ${weekData.improvementPercent}% this week — your consistency is paying off!`,
    `You tend to ${weekData.worstPattern} — try making one swap this week.`,
    `${weekData.bestDay} was your best day — use it as your weekly template.`,
  ]

  const prompt = `
You are EatSmart, a behavior nutrition AI.

Here is a user's weekly food behavior data:
- Green (healthy) meals: ${weekData.greenCount}
- Yellow (moderate) meals: ${weekData.yellowCount}
- Red (unhealthy) meals: ${weekData.redCount}
- Best day: ${weekData.bestDay}
- Week-over-week improvement: ${weekData.improvementPercent}%
- Detected pattern: ${weekData.worstPattern}

Generate exactly 3 insight strings as a JSON array.
Each insight should be 1 sentence, motivating but honest.
Vary the style — one positive, one constructive, one encouraging trend.

Return ONLY a JSON array of 3 strings. No markdown. No explanation outside the array.
`.trim()

  const text = await safeGenerate(prompt, null)
  if (!text) return fallback
  const parsed = parseJSON(text, null)
  if (Array.isArray(parsed) && parsed.length === 3) return parsed
  return fallback
}
