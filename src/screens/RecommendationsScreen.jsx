import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'
import { getRecommendations } from '../logic/recommend'
import { explainFood, explainSwap } from '../logic/gemini'

export default function RecommendationsScreen() {
  const { goal, budget, mealTime, setScreen } = useAppStore()
  const [recs, setRecs] = useState([])

  // On mount, filter the foods based on current store state
  useEffect(() => {
    const results = getRecommendations(goal, budget, mealTime, 4)
    setRecs(results)
  }, [goal, budget, mealTime])

  return (
    <div className="flex flex-col gap-5 pb-8 h-full">
      <div className="flex items-center justify-between">
        <p className="text-text-secondary text-sm">
          Top picks for <span className="text-text-primary font-semibold">{goal}</span> under a <span className="text-text-primary font-semibold">{budget}</span> budget.
        </p>
        <button onClick={() => setScreen('input')} className="btn-ghost text-xs">Edit</button>
      </div>

      <div className="flex flex-col gap-4">
        {recs.length === 0 ? (
          <p className="text-center text-text-muted py-10">No exact matches found. Try adjusting your preferences.</p>
        ) : (
          recs.map((food, idx) => (
            <FoodCard key={food.id} food={food} goal={goal} idx={idx} />
          ))
        )}
      </div>
    </div>
  )
}

function FoodCard({ food, goal, idx }) {
  const { getCachedAI, cacheAI } = useAppStore()
  const [aiText, setAiText] = useState('')
  const [swapText, setSwapText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const swap = food.alternatives?.[0]

  useEffect(() => {
    let isMounted = true;

    async function fetchAI() {
      // Check cache first
      const cached = getCachedAI(food.id)
      if (cached?.explanation && cached?.swapExplanation) {
        setAiText(cached.explanation)
        setSwapText(cached.swapExplanation)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      
      // Fire Gemini requests in parallel
      const promises = [explainFood(food, goal)]
      if (swap) promises.push(explainSwap(food, swap, goal))

      const results = await Promise.all(promises)
      
      if (isMounted) {
        setAiText(results[0])
        if (swap) setSwapText(results[1])
        
        // Save to cache
        cacheAI(food.id, { explanation: results[0], swapExplanation: results[1] })
        setIsLoading(false)
      }
    }

    fetchAI()
    return () => { isMounted = false }
  }, [food.id, goal, swap])

  const badgeColor = 
    food.healthScore === 'Green' ? 'badge-green' : 
    food.healthScore === 'Yellow' ? 'badge-yellow' : 'badge-red'

  return (
    <motion.div 
      className="card flex flex-col gap-3 relative overflow-hidden"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.1 }}
    >
      {/* Header: Name + Badge */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-bold text-lg leading-tight text-text-primary pr-4">{food.name}</h3>
        <span className={`${badgeColor} shrink-0`}>{food.healthScore}</span>
      </div>

      {/* Macros */}
      <div className="flex gap-4 text-sm font-medium">
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="text-accent-cyan">🔥</span> {food.calories} cal
        </div>
        <div className="flex items-center gap-1.5 text-text-secondary">
          <span className="text-accent">💪</span> {food.protein}g protein
        </div>
      </div>

      {/* Gemini AI Reason */}
      <div className="bg-bg-base/50 p-3 rounded-xl border border-bg-border/50 mt-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-bold text-accent">AI Reasoning</span>
        </div>
        {isLoading ? (
          <div className="space-y-2 mt-2">
            <div className="h-3 bg-bg-elevated rounded animate-shimmer w-[90%]" />
            <div className="h-3 bg-bg-elevated rounded animate-shimmer w-[70%]" />
          </div>
        ) : (
          <p className="text-sm text-text-primary/90 leading-relaxed">{aiText}</p>
        )}
      </div>

      {/* Better Swap Suggestion */}
      {swap && (
        <div className="mt-2 pt-3 border-t border-bg-border/60">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="text-xs">🔄</span>
            <span className="text-xs font-semibold text-text-secondary">Better Swap Suggestion</span>
          </div>
          {isLoading ? (
            <div className="h-4 bg-bg-elevated rounded animate-shimmer w-3/4 mt-2" />
          ) : (
            <p className="text-sm">
              <span className="text-green-400 font-medium">Try {swap.name}</span>
              <span className="text-text-muted"> — {swapText}</span>
              <span className="ml-2 text-xs font-bold text-health-green bg-health-green-dim px-2 py-0.5 rounded-md">
                -{swap.caloriesSaved} cal
              </span>
            </p>
          )}
        </div>
      )}
    </motion.div>
  )
}
