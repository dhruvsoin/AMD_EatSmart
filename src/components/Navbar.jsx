import useAppStore from '../store/useAppStore'

/**
 * Navbar — top bar with logo + current screen context
 * Kept intentionally slim — the bottom nav handles navigation.
 */
export default function Navbar() {
  const { screen, setScreen } = useAppStore()

  const screenTitles = {
    home: null,                // home shows full hero, no title needed
    input: 'Set Your Preferences',
    recommendations: 'Your Recommendations',
    scan: 'Food Scan',
    insights: 'Your Insights',
    dailyplan: 'Daily Meal Plan',
  }

  const title = screenTitles[screen]

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-50
                 bg-bg-base/80 backdrop-blur-md
                 border-b border-bg-border"
    >
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <button
          id="navbar-logo"
          onClick={() => setScreen('home')}
          className="flex items-center gap-2 group"
        >
          <img src="/favicon.svg" alt="Annam Logo" className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xl font-bold tracking-tight">
            <span className="text-accent font-serif italic tracking-wide">Annam</span>
            <span className="text-text-muted font-light ml-1.5 text-xs tracking-widest uppercase"></span>
          </span>
        </button>

        {/* Center title (appears on sub-screens) */}
        {title && (
          <p className="absolute left-1/2 -translate-x-1/2
                        text-base font-serif font-bold text-text-primary tracking-tight">
            {title}
          </p>
        )}


      </div>
    </header>
  )
}
