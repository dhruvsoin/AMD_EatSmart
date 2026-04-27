import { useState } from 'react'
import { motion } from 'framer-motion'
import useAppStore from '../store/useAppStore'
import { scanFood } from '../logic/gemini'

export default function ScanScreen() {
  const { scanQuery, setScanQuery, scanResult, setScanResult } = useAppStore()
  const [isScanning, setIsScanning] = useState(false)

  const handleScan = async (e) => {
    e?.preventDefault()
    if (!scanQuery.trim()) return

    setIsScanning(true)
    // Clear previous result while loading
    setScanResult(null)
    
    // Call Gemini API
    const result = await scanFood(scanQuery)
    setScanResult(result)
    setIsScanning(false)
  }

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Quick Food Scan</h2>
        <p className="text-text-secondary text-sm">Type any Indian food to get an instant AI health analysis.</p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleScan} className="relative">
        <input
          type="text"
          placeholder="e.g., Samosa, Butter Chicken, Masala Dosa..."
          className="input-field pl-11 shadow-sm"
          value={scanQuery}
          onChange={(e) => setScanQuery(e.target.value)}
          disabled={isScanning}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-50">🔍</span>
        
        <button 
          type="submit" 
          disabled={!scanQuery.trim() || isScanning}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent hover:bg-accent-light text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-50 transition-colors"
        >
          {isScanning ? 'Scanning...' : 'Scan'}
        </button>
      </form>

      {/* Loading Skeleton */}
      {isScanning && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="card flex flex-col gap-4 mt-2"
        >
          <div className="flex justify-between items-center">
            <div className="h-6 bg-bg-elevated rounded animate-shimmer w-1/3" />
            <div className="h-6 bg-bg-elevated rounded-full animate-shimmer w-16" />
          </div>
          <div className="h-4 bg-bg-elevated rounded animate-shimmer w-24" />
          <div className="divider my-0" />
          <div className="h-4 bg-bg-elevated rounded animate-shimmer w-full" />
          <div className="h-4 bg-bg-elevated rounded animate-shimmer w-5/6" />
        </motion.div>
      )}

      {/* Scan Result Card */}
      {!isScanning && scanResult && (
        <motion.div 
          className="card flex flex-col gap-4 mt-2 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          {/* Top colored border based on health score */}
          <div className={`absolute top-0 left-0 right-0 h-1 
            ${scanResult.healthScore === 'Green' ? 'bg-health-green' : 
              scanResult.healthScore === 'Yellow' ? 'bg-health-yellow' : 'bg-health-red'}`} 
          />
          
          <div className="flex justify-between items-start pt-1">
            <h3 className="font-bold text-xl capitalize text-text-primary pr-4">{scanQuery}</h3>
            <span className={`
              ${scanResult.healthScore === 'Green' ? 'badge-green' : 
                scanResult.healthScore === 'Yellow' ? 'badge-yellow' : 'badge-red'}
            `}>
              {scanResult.healthScore}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
            <span className="text-accent-cyan">🔥</span> 
            Est. {scanResult.calories} calories per serving
          </div>

          <div className="bg-bg-base/50 p-3.5 rounded-xl border border-bg-border/50 flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🔄</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">AI Alternative</span>
            </div>
            <p className="text-base font-semibold text-accent-light">{scanResult.alternative}</p>
            <p className="text-sm text-text-primary/90 leading-relaxed">{scanResult.reason}</p>
          </div>
        </motion.div>
      )}

      {/* Empty State placeholder */}
      {!isScanning && !scanResult && (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 mt-10">
          <span className="text-6xl mb-4">📸</span>
          <p className="text-sm font-medium">Type a food above to <br/> analyze its nutritional value.</p>
        </div>
      )}

    </div>
  )
}
