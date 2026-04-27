import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'

export default function ProfileScreen() {
  const { name, age, height, weight, goal, budget, setHasOnboarded, weekData } = useAppStore()

  // Calculate BMI if height and weight exist
  const bmi = (weight && height) ? (weight / Math.pow(height / 100, 2)).toFixed(1) : 'N/A'

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Profile</h2>
        <button 
          onClick={() => setHasOnboarded(false)}
          className="text-xs font-bold text-accent hover:text-accent-light transition-colors px-3 py-1.5 rounded-lg bg-accent/10"
        >
          Edit Setup
        </button>
      </div>

      {/* User Info Card */}
      <motion.div 
        className="card-elevated flex items-center gap-4 border-accent/20 bg-gradient-to-br from-bg-elevated to-bg-surface"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-2xl shadow-lg font-black text-white">
          {name ? name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div className="flex flex-col">
          <h3 className="text-xl font-black text-text-primary capitalize">{name || 'EatSmart User'}</h3>
          <p className="text-sm text-text-secondary font-medium mt-0.5">
            {age ? `${age}y` : ''} {height ? `• ${height}cm` : ''} {weight ? `• ${weight}kg` : ''}
          </p>
          <div className="flex gap-2 mt-2">
            <span className="badge-green">{goal}</span>
            <span className="badge-yellow">BMI: {bmi}</span>
          </div>
        </div>
      </motion.div>

      <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mt-2">AI Health Stats</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard title="Current Streak" value="7 Days" icon="🔥" delay={0.1} />
        <StatCard title="Overall Score" value="85/100" icon="🎯" delay={0.2} />
        <StatCard title="Foods Scanned" value="24" icon="📸" delay={0.3} />
        <StatCard title="Green Choices" value={weekData.greenCount} icon="🟢" delay={0.4} />
      </div>

      <motion.div 
        className="card mt-2 border-dashed border-2 border-bg-border/50 flex flex-col items-center justify-center py-8 opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-3xl mb-2">🏆</span>
        <p className="text-sm font-bold">Pro Tier Active</p>
        <p className="text-xs text-text-muted text-center max-w-[80%] mt-1">Hackathon edition unlocks all AI capabilities.</p>
      </motion.div>

    </div>
  )
}

function StatCard({ title, value, icon, delay }) {
  return (
    <motion.div 
      className="card p-4 flex flex-col gap-1 relative overflow-hidden group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="absolute -right-2 -bottom-2 text-5xl opacity-5 group-hover:scale-110 transition-transform origin-bottom-right">
        {icon}
      </div>
      <span className="text-xs font-bold text-text-muted uppercase tracking-wide">{title}</span>
      <span className="text-2xl font-black text-text-primary">{value}</span>
    </motion.div>
  )
}
