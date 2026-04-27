import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import useAppStore from '../store/useAppStore'
import { insightNarrative } from '../logic/gemini'

export default function InsightsScreen() {
  const { weekData, name } = useAppStore()
  const [insights, setInsights] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchInsights() {
      setIsLoading(true)
      const results = await insightNarrative(weekData)
      setInsights(results)
      setIsLoading(false)
    }
    fetchInsights()
  }, [weekData])

  // Custom colors for the chart based on the health score dominance
  const getColor = (data) => {
    const total = data.green + data.yellow + data.red
    if (total === 0) return '#2D2D3A' // Empty day
    if (data.red > data.green) return '#EF4444' // Red
    if (data.green > data.yellow) return '#10B981' // Green
    return '#F59E0B' // Yellow
  }

  // Format data for Recharts by calculating a stacked "score" for display height
  const chartData = weekData.weekChart.map(d => ({
    ...d,
    totalCount: (d.green * 1.5) + (d.yellow * 1) + (d.red * 0.5) || 0.1, // Fake height for viz
  }))

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Weekly Insights</h2>
        <p className="text-text-secondary text-sm">See your patterns, {name || 'User'}.</p>
      </div>

      {/* Hero Chart */}
      <motion.div 
        className="card-elevated border-accent/20 bg-gradient-to-b from-bg-elevated to-bg-base"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-text-primary text-sm tracking-wide uppercase">Choice Quality</h3>
          <span className="badge-green text-xs">+{weekData.improvementPercent}% from last week</span>
        </div>

        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#8B8B9B', fontSize: 10 }} 
                dy={10}
              />
              <Tooltip 
                cursor={{ fill: '#6E56CF', opacity: 0.1 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-bg-surface border border-bg-border rounded-lg p-2 shadow-xl">
                        <p className="font-bold text-xs mb-1">{data.day}</p>
                        <p className="text-[10px] text-health-green">🟢 {data.green} Green</p>
                        <p className="text-[10px] text-health-yellow">🟡 {data.yellow} Yellow</p>
                        <p className="text-[10px] text-health-red">🔴 {data.red} Red</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="totalCount" radius={[4, 4, 4, 4]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* AI Coach Insights */}
      <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mt-2">Coach AI Review</h3>

      <div className="flex flex-col gap-3">
        {isLoading ? (
          // Skeletons
          [1, 2, 3].map(i => (
            <motion.div key={i} className="card p-4 flex gap-3 items-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.1 }}>
              <div className="w-8 h-8 rounded-full bg-bg-base shrink-0 animate-pulse" />
              <div className="flex-1 space-y-2 mt-1">
                <div className="h-3 bg-bg-elevated rounded animate-shimmer w-[90%]" />
                <div className="h-3 bg-bg-elevated rounded animate-shimmer w-[60%]" />
              </div>
            </motion.div>
          ))
        ) : (
          insights.map((text, idx) => (
            <motion.div 
              key={idx}
              className="card p-4 flex gap-3 items-start group hover:border-accent/30 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {idx === 0 ? '📈' : idx === 1 ? '💡' : '🌟'}
              </div>
              <p className="text-sm text-text-primary/90 leading-relaxed pt-0.5">
                {text}
              </p>
            </motion.div>
          ))
        )}
      </div>

    </div>
  )
}
