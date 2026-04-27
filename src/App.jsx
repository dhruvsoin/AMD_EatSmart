import { AnimatePresence, motion } from 'framer-motion'
import useAppStore from './store/useAppStore'
import Navbar from './components/Navbar'

// Screens (lazy-ish — direct imports for hackathon speed)
import HomeScreen from './screens/HomeScreen'
import InputScreen from './screens/InputScreen'
import RecommendationsScreen from './screens/RecommendationsScreen'
import ScanScreen from './screens/ScanScreen'
import InsightsScreen from './screens/InsightsScreen'
import DailyPlanScreen from './screens/DailyPlanScreen'
import ProfileScreen from './screens/ProfileScreen'
import OnboardingScreen from './screens/OnboardingScreen'

const SCREEN_MAP = {
  home: HomeScreen,
  input: InputScreen,
  recommendations: RecommendationsScreen,
  scan: ScanScreen,
  insights: InsightsScreen,
  dailyplan: DailyPlanScreen,
  profile: ProfileScreen,
}

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit:    { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.15, ease: 'easeIn' } },
}

export default function App() {
  const { screen, hasOnboarded } = useAppStore()
  const ActiveScreen = SCREEN_MAP[screen] ?? HomeScreen

  if (!hasOnboarded) {
    return <OnboardingScreen />
  }

  return (
    <div className="min-h-dvh bg-bg-base flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 pb-24 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ActiveScreen />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom nav bar */}
      <BottomNav />
    </div>
  )
}

/* ── Bottom Navigation ──────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'home',      label: 'Home',    icon: HomeIcon },
  { id: 'scan',      label: 'Scan',    icon: ScanIcon },
  { id: 'dailyplan', label: 'Plan',    icon: PlanIcon },
  { id: 'insights',  label: 'Insights',icon: InsightsIcon },
  { id: 'profile',   label: 'Profile', icon: ProfileIcon },
]

function BottomNav() {
  const { screen, setScreen } = useAppStore()

  return (
    <nav
      id="bottom-nav"
      className="fixed bottom-0 left-0 right-0 z-50
                 bg-bg-surface/90 backdrop-blur-md
                 border-t border-bg-border
                 flex items-center justify-around
                 px-2 py-3"
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const active = screen === id || (screen === 'recommendations' && id === 'home') || (screen === 'input' && id === 'home')
        return (
          <button
            key={id}
            id={`nav-${id}`}
            onClick={() => setScreen(id)}
            className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl
                        transition-all duration-200 group
                        ${active ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}`}
          >
            <Icon
              className={`w-5 h-5 transition-transform duration-200
                          ${active ? 'scale-110' : 'group-hover:scale-105'}`}
            />
            <span className="text-[10px] font-medium">{label}</span>
            {active && (
              <motion.div
                layoutId="nav-indicator"
                className="absolute bottom-1 w-1 h-1 rounded-full bg-accent"
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
function HomeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}
function ScanIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  )
}
function PlanIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  )
}
function InsightsIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  )
}
function ProfileIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )
}
