import foods from '../data/foods.json'

const BUDGET_RANK = { Low: 1, Medium: 2, High: 3 }

/**
 * getRecommendations
 * Filters the food dataset by goal, budget, and meal time,
 * then sorts by the goal-appropriate metric.
 *
 * @param {string} goal      - "Weight Loss" | "Muscle Gain" | "Healthy Living"
 * @param {string} budget    - "Low" | "Medium" | "High"
 * @param {string} mealTime  - "Breakfast" | "Lunch" | "Dinner" | "Snack"
 * @param {number} limit     - max results (default 5)
 * @returns {Array}          - sorted food items
 */
export function getRecommendations(goal, budget, mealTime, limit = 5) {
  const userBudgetRank = BUDGET_RANK[budget] ?? 2

  // 1. FILTER
  let filtered = foods.filter((food) => {
    const categoryMatch = food.category === mealTime
    const budgetMatch = BUDGET_RANK[food.budget] <= userBudgetRank
    const goalMatch =
      food.goalTags.includes(goal) || food.goalTags.length === 0
    return categoryMatch && budgetMatch && goalMatch
  })

  // Fallback: if no goal match, just filter by category + budget
  if (filtered.length === 0) {
    filtered = foods.filter(
      (food) =>
        food.category === mealTime &&
        BUDGET_RANK[food.budget] <= userBudgetRank
    )
  }

  // 2. SORT
  if (goal === 'Muscle Gain') {
    filtered.sort((a, b) => b.protein - a.protein)
  } else if (goal === 'Weight Loss') {
    filtered.sort((a, b) => a.calories - b.calories)
  } else {
    // Healthy Living: Green → Yellow → Red
    const scoreOrder = { Green: 0, Yellow: 1, Red: 2 }
    filtered.sort(
      (a, b) =>
        (scoreOrder[a.healthScore] ?? 3) - (scoreOrder[b.healthScore] ?? 3)
    )
  }

  // 3. RETURN top N
  return filtered.slice(0, limit)
}

/**
 * getDailyPlan
 * Generates a full-day meal plan (one item per meal slot).
 *
 * @param {string} goal
 * @param {string} budget
 * @returns {{ breakfast, lunch, dinner, snack, totalCalories, totalProtein }}
 */
export function getDailyPlan(goal, budget) {
  const slots = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
  const plan = {}
  let totalCalories = 0
  let totalProtein = 0

  slots.forEach((slot) => {
    const results = getRecommendations(goal, budget, slot, 3)
    // Pick randomly from top 3 for variety
    const pick = results[Math.floor(Math.random() * results.length)] || null
    const key = slot.toLowerCase()
    plan[key] = pick
    if (pick) {
      totalCalories += pick.calories
      totalProtein += pick.protein
    }
  })

  return { ...plan, totalCalories, totalProtein }
}

/**
 * searchFood
 * Finds a food item by name (case-insensitive partial match).
 *
 * @param {string} query
 * @returns {Object|null}
 */
export function searchFood(query) {
  if (!query || query.trim().length < 2) return null
  const q = query.toLowerCase().trim()
  return (
    foods.find((f) => f.name.toLowerCase().includes(q)) || null
  )
}

/**
 * getAllFoods
 * Returns the full dataset (used by Scan screen fallback).
 */
export function getAllFoods() {
  return foods
}
