import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * useAppStore — Global Zustand state for EatSmart AI
 *
 * Tracks:
 *  - User selections (goal, budget, mealTime)
 *  - Current screen for SPA navigation
 *  - AI response cache (prevents re-calling Gemini for same food)
 *  - Daily plan + scan result
 */
const useAppStore = create(
  persist(
    (set, get) => ({
  // ── User Preferences ──────────────────────────────────────────────────────
  hasOnboarded: false,
  setHasOnboarded: (val) => set({ hasOnboarded: val }),
  name: '',
  age: '',
  height: '',
  weight: '',
  setName: (name) => set({ name }),
  setAge: (age) => set({ age }),
  setHeight: (height) => set({ height }),
  setWeight: (weight) => set({ weight }),
  goal: 'Healthy Living',       // "Weight Loss" | "Muscle Gain" | "Healthy Living"
  budget: 'Medium',             // "Low" | "Medium" | "High"
  mealTime: 'Lunch',            // "Breakfast" | "Lunch" | "Dinner" | "Snack"

  setGoal: (goal) => set({ goal }),
  setBudget: (budget) => set({ budget }),
  setMealTime: (mealTime) => set({ mealTime }),

  // ── Navigation ────────────────────────────────────────────────────────────
  // Screens: 'home' | 'input' | 'recommendations' | 'scan' | 'insights' | 'dailyplan'
  screen: 'home',
  setScreen: (screen) => set({ screen }),

  // ── Recommendations ───────────────────────────────────────────────────────
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),

  // ── Daily Plan ────────────────────────────────────────────────────────────
  dailyPlan: null,
  setDailyPlan: (dailyPlan) => set({ dailyPlan }),

  // ── Scan ──────────────────────────────────────────────────────────────────
  scanResult: null,
  setScanResult: (scanResult) => set({ scanResult }),
  scanQuery: '',
  setScanQuery: (scanQuery) => set({ scanQuery }),

  // ── Gemini AI Response Cache ──────────────────────────────────────────────
  // Key: food.id, Value: { explanation, swapExplanation }
  aiCache: {},
  cacheAI: (foodId, data) =>
    set((state) => ({
      aiCache: { ...state.aiCache, [foodId]: { ...state.aiCache[foodId], ...data } },
    })),
  getCachedAI: (foodId) => get().aiCache[foodId] || null,

  // ── Mock Weekly Data (for Insights screen) ────────────────────────────────
  weekData: {
    greenCount: 8,
    yellowCount: 5,
    redCount: 3,
    bestDay: 'Wednesday',
    improvementPercent: 18,
    worstPattern: 'choose high-calorie dinners',
    weekChart: [
      { day: 'Mon', green: 1, yellow: 1, red: 1 },
      { day: 'Tue', green: 2, yellow: 0, red: 1 },
      { day: 'Wed', green: 3, yellow: 1, red: 0 },
      { day: 'Thu', green: 1, yellow: 2, red: 0 },
      { day: 'Fri', green: 0, yellow: 1, red: 2 },
      { day: 'Sat', green: 1, yellow: 0, red: 1 },
      { day: 'Sun', green: 0, yellow: 0, red: 1 },
    ],
  },
}),
    {
      name: 'eatsmart-storage', // saves to browser localStorage
      partialize: (state) => ({ 
        hasOnboarded: state.hasOnboarded,
        name: state.name,
        age: state.age,
        height: state.height,
        weight: state.weight,
        goal: state.goal,
        budget: state.budget 
      }), // Only persist profile data, not the active screen or API cache
    }
  )
)

export default useAppStore
