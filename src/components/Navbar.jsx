import useAppStore from '../store/useAppStore'

/**
 * Navbar — top bar with logo + current screen context
 * Kept intentionally slim — the bottom nav handles navigation.
 */
export default function Navbar() {
  const { screen, setScreen } = useAppStore()

  const screenTitles = {
    home:            null,                // home shows full hero, no title needed
    input:           'Set Your Preferences',
    recommendations: 'Your Recommendations',
    scan:            'Food Scan',
    insights:        'Your Insights',
    dailyplan:       'Daily Meal Plan',
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
          <span className="text-xl">🥗</span>
          <span className="font-bold text-base tracking-tight">
            <span className="gradient-text">EatSmart</span>
            <span className="text-text-secondary font-light"> AI</span>
          </span>
        </button>

        {/* Center title (appears on sub-screens) */}
        {title && (
          <p className="absolute left-1/2 -translate-x-1/2
                        text-sm font-semibold text-text-secondary tracking-wide">
            {title}
          </p>
        )}

        {/* Powered by badge */}
        <div className="flex items-center gap-1.5 text-[10px] text-text-muted font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span>Gemini AI</span>
        </div>
      </div>
    </header>
  )
}
