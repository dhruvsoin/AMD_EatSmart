import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'

export default function HomeScreen() {
  const setScreen = useAppStore((s) => s.setScreen)

  // Smart Nudge Logic
  const getSmartNudge = () => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 11) return "Good morning! Start strong — pick a high-protein breakfast."
    if (hour >= 11 && hour < 15) return "It's lunch time — go for a balanced, filling meal."
    if (hour >= 15 && hour < 18) return "Afternoon slump? A healthy snack can fix that — skip the chips."
    if (hour >= 18 && hour < 21) return "Dinner approaching — go light tonight and sleep better."
    return "Late night? Avoid heavy meals — try a small snack if needed."
  }

  return (
    <div className="flex flex-col gap-6 w-full h-full pb-8 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="mt-4 flex flex-col gap-2 relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -top-10 -right-20 w-64 h-64 bg-accent-cyan/10 rounded-full blur-[80px] pointer-events-none" />
        
        <motion.h1 
          className="text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight text-balance"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Don't just track food. <br/>
          <span className="gradient-text">Decide smarter.</span>
        </motion.h1>
        <motion.p 
          className="text-text-secondary mt-2 text-base max-w-[90%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Your real-time AI nutrition engine. Tell us your goal, get instant, intelligent meal recommendations.
        </motion.p>
      </section>

      {/* Smart Nudge */}
      <motion.div 
        className="card bg-bg-elevated/50 border-accent/20 flex gap-4 items-center mt-2 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-accent" />
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <span className="text-xl">💡</span>
        </div>
        <p className="text-sm font-medium text-text-primary leading-snug">
          {getSmartNudge()}
        </p>
      </motion.div>

      {/* Main CTA */}
      <motion.div 
        className="mt-6 flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          onClick={() => setScreen('input')}
          className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 group"
        >
          <span>What should I eat right now?</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </motion.div>

      <div className="divider my-2" />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <QuickActionCard 
          icon="🔍" 
          title="Quick Scan" 
          desc="Analyze any food"
          onClick={() => setScreen('scan')}
          delay={0.4}
        />
        <QuickActionCard 
          icon="📅" 
          title="Daily Plan" 
          desc="Full day AI menu"
          onClick={() => setScreen('dailyplan')}
          delay={0.5}
        />
      </div>
    </div>
  )
}

function QuickActionCard({ icon, title, desc, onClick, delay }) {
  return (
    <motion.button
      onClick={onClick}
      className="card hover:border-accent/50 transition-colors text-left flex flex-col gap-1 group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="text-2xl mb-1 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="font-semibold text-text-primary text-sm">{title}</h3>
      <p className="text-xs text-text-muted">{desc}</p>
    </motion.button>
  )
}
