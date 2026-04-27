import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'

const MEAL_TIMES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export default function InputScreen() {
  const { mealTime, setMealTime, setScreen } = useAppStore()

  const handleSearch = () => {
    setScreen('recommendations')
  }

  return (
    <div className="flex flex-col gap-8 h-full pb-8">
      <motion.div 
        className="flex flex-col gap-1"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-2xl font-bold">What time is it?</h2>
        <p className="text-text-secondary text-sm">We'll use your profile goal to find the perfect meal.</p>
      </motion.div>

      <div className="flex flex-col gap-6">
        
        {/* Meal Time Selector */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="section-label">Select Context</span>
          <div className="flex flex-col gap-3">
            {MEAL_TIMES.map((opt) => (
              <button
                key={opt}
                onClick={() => setMealTime(opt)}
                className={`p-4 rounded-xl text-left font-bold transition-all border
                  ${mealTime === opt ? 'border-accent bg-accent/10 text-accent-light' : 'border-bg-border/50 bg-bg-elevated/50 text-text-primary'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

      </div>

      <motion.div 
        className="mt-auto pt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button 
          onClick={handleSearch}
          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 group"
        >
          <span>Find My Meal</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </motion.div>
    </div>
  )
}
