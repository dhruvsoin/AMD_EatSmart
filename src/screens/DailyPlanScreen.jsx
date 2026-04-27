import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../store/useAppStore'
import { getDailyPlan } from '../logic/recommend'
import { planSummary } from '../logic/gemini'

export default function DailyPlanScreen() {
  const { goal, budget, dailyPlan, setDailyPlan } = useAppStore()
  
  const [aiSummary, setAiSummary] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Generate plan function
  const generateNewPlan = async () => {
    setIsGenerating(true)
    
    // 1. Get plan from local filter logic instantly
    const plan = getDailyPlan(goal, budget)
    setDailyPlan(plan)
    
    // 2. Ask Gemini to write a coach summary based on this exact plan
    const summary = await planSummary(
      plan, 
      goal, 
      plan.totalCalories, 
      plan.totalProtein
    )
    
    setAiSummary(summary)
    setIsGenerating(false)
  }

  // Initial generation on mount if no plan exists
  useEffect(() => {
    if (!dailyPlan) {
      generateNewPlan()
    }
  }, [])

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold">Your Daily Plan</h2>
          <p className="text-text-secondary text-sm">Optimized for <span className="text-accent-light font-semibold">{goal}</span></p>
        </div>
        <button 
          onClick={generateNewPlan}
          disabled={isGenerating}
          className="btn-secondary text-xs px-3 py-1.5 flex items-center gap-1.5"
        >
          <span className={isGenerating ? "animate-spin" : ""}>🔄</span> 
          Regenerate
        </button>
      </div>

      {/* AI Summary Coach Box */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={isGenerating ? 'loading' : 'ready'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="card-elevated border-accent/20 bg-gradient-to-br from-bg-elevated to-bg-surface"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🤖</span>
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Coach AI</span>
          </div>
          {isGenerating ? (
            <div className="space-y-2 mt-3">
              <div className="h-4 bg-bg-base rounded animate-shimmer w-[95%]" />
              <div className="h-4 bg-bg-base rounded animate-shimmer w-[85%]" />
            </div>
          ) : (
            <p className="text-sm font-medium leading-relaxed text-text-primary/90">
              {aiSummary || "Generating your personalized coaching advice..."}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Total Macros Row */}
      {dailyPlan && (
        <motion.div 
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="stat-box flex-1 py-3">
            <span className="text-text-muted text-xs font-bold uppercase">Total Calories</span>
            <span className="text-xl font-black text-text-primary">{dailyPlan.totalCalories}</span>
          </div>
          <div className="stat-box flex-1 py-3">
            <span className="text-text-muted text-xs font-bold uppercase">Total Protein</span>
            <span className="text-xl font-black text-accent-cyan">{dailyPlan.totalProtein}g</span>
          </div>
        </motion.div>
      )}

      {/* Meal Slots List */}
      <div className="flex flex-col gap-3 mt-2">
        {['breakfast', 'lunch', 'dinner', 'snack'].map((slot, idx) => {
          const item = dailyPlan?.[slot]
          return (
            <motion.div 
              key={`${slot}-${item?.id || 'loading'}`}
              className="card p-3.5 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-bg-base flex flex-col items-center justify-center shrink-0 border border-bg-border/50">
                <span className="text-xs font-bold text-text-muted uppercase tracking-tighter">
                  {slot === 'breakfast' ? 'BF' : slot === 'snack' ? 'SN' : slot.substring(0, 2).toUpperCase()}
                </span>
              </div>
              
              <div className="flex-1 overflow-hidden">
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-0.5">{slot}</p>
                {item ? (
                  <>
                    <p className="font-semibold text-text-primary truncate">{item.name}</p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {item.calories} cal <span className="mx-1">•</span> {item.protein}g protein
                    </p>
                  </>
                ) : (
                  <div className="h-4 bg-bg-elevated rounded animate-shimmer w-3/4 mt-1" />
                )}
              </div>

              {item && (
                <div className={`
                  ${item.healthScore === 'Green' ? 'text-health-green' : 
                    item.healthScore === 'Yellow' ? 'text-health-yellow' : 'text-health-red'}
                  text-2xl opacity-80 shrink-0
                `}>
                  ●
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
