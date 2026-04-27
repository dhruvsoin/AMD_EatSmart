import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAppStore from '../store/useAppStore'

const GOALS = [
  { id: 'Weight Loss', icon: '📉', desc: 'Burn fat & get lean' },
  { id: 'Muscle Gain', icon: '💪', desc: 'Build size & strength' },
  { id: 'Healthy Living', icon: '🥑', desc: 'Maintain & feel good' }
]

const BUDGETS = [
  { id: 'Low', desc: 'Budget friendly' },
  { id: 'Medium', desc: 'Standard choices' },
  { id: 'High', desc: 'Premium ingredients' }
]

export default function OnboardingScreen() {
  const { 
    name, setName, 
    age, setAge, 
    height, setHeight,
    weight, setWeight,
    goal, setGoal, 
    budget, setBudget, 
    setHasOnboarded, setScreen 
  } = useAppStore()
  
  const [step, setStep] = useState(0)

  const handleComplete = () => {
    setHasOnboarded(true)
    setScreen('home')
  }

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col px-6 py-12">
      {step > 0 && (
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-bold text-accent tracking-widest uppercase">Annam AI</span>
          <span className="text-xs text-text-muted font-medium">Step {step} of 4</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center items-center text-center"
          >
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-accent/20 mb-6 border border-bg-border">
              <img src="/favicon.svg" alt="Annam Logo" className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-black mb-3">Welcome to <span className="gradient-text">Annam</span></h1>
            <p className="text-text-secondary text-lg mb-10 max-w-[80%]">Your intelligent, proactive nutrition engine. Let's set up your profile.</p>
            
            <button 
              onClick={() => setStep(1)}
              className="btn-primary py-4 px-10 text-lg w-full flex justify-center gap-2"
            >
              <span>Get Started</span>
              <span>→</span>
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-black mb-2">What's your name?</h1>
            <p className="text-text-secondary mb-8">So we know what to call you.</p>
            
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex"
              className="input-field text-xl py-4"
              autoFocus
            />

            <button 
              onClick={() => setStep(2)}
              disabled={!name.trim()}
              className="btn-primary mt-12 py-4 text-lg w-full disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-black mb-2">Body Metrics</h1>
            <p className="text-text-secondary mb-8">This helps calculate your daily requirements.</p>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Age (Years)</label>
                <input 
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  className="input-field text-xl py-4"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Height (cm)</label>
                <input 
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  className="input-field text-xl py-4"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-text-secondary uppercase mb-2 block">Current Weight (kg)</label>
                <input 
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="input-field text-xl py-4"
                />
              </div>
            </div>

            <button 
              onClick={() => setStep(3)}
              disabled={!age || !height || !weight}
              className="btn-primary mt-12 py-4 text-lg w-full disabled:opacity-50"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-black mb-2">What's your primary goal?</h1>
            <p className="text-text-secondary mb-8">This helps the AI tailor all food recommendations to your body.</p>
            
            <div className="flex flex-col gap-3">
              {GOALS.map(g => (
                <button 
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-4 rounded-2xl flex items-center gap-4 border text-left transition-all
                    ${goal === g.id ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(110,86,207,0.2)]' : 'border-bg-border/50 bg-bg-elevated/50'}`}
                >
                  <span className="text-3xl">{g.icon}</span>
                  <div>
                    <h3 className={`font-bold ${goal === g.id ? 'text-accent-light' : 'text-text-primary'}`}>{g.id}</h3>
                    <p className="text-sm text-text-secondary">{g.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep(4)}
              className="btn-primary mt-12 py-4 text-lg w-full"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h1 className="text-3xl font-black mb-2">Set your daily budget</h1>
            <p className="text-text-secondary mb-8">The AI will filter out foods that are too expensive.</p>
            
            <div className="flex flex-col gap-3">
              {BUDGETS.map(b => (
                <button 
                  key={b.id}
                  onClick={() => setBudget(b.id)}
                  className={`p-4 rounded-2xl flex items-center justify-between border text-left transition-all
                    ${budget === b.id ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(110,86,207,0.2)]' : 'border-bg-border/50 bg-bg-elevated/50'}`}
                >
                  <div>
                    <h3 className={`font-bold ${budget === b.id ? 'text-accent-light' : 'text-text-primary'}`}>{b.id} Budget</h3>
                    <p className="text-sm text-text-secondary">{b.desc}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${budget === b.id ? 'border-accent' : 'border-bg-border'}`}>
                    {budget === b.id && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                </button>
              ))}
            </div>

            <button 
              onClick={handleComplete}
              className="btn-primary mt-12 py-4 text-lg w-full flex justify-center gap-2"
            >
              <span>Build My Profile</span>
              <span>✨</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
