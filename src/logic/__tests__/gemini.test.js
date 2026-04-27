import { describe, it, expect } from 'vitest'
import { parseJSON } from '../gemini'

describe('Gemini Logic Utilities', () => {
  it('should parse valid JSON strings correctly', () => {
    const jsonStr = '{"calories": 200, "healthScore": "Green"}'
    const result = parseJSON(jsonStr, {})
    expect(result.calories).toBe(200)
    expect(result.healthScore).toBe('Green')
  })

  it('should clean markdown backticks from Gemini responses before parsing', () => {
    const jsonStr = '```json\n{"calories": 500}\n```'
    const result = parseJSON(jsonStr, {})
    expect(result.calories).toBe(500)
  })

  it('should return fallback if JSON is invalid', () => {
    const invalidStr = 'Not JSON'
    const fallback = { error: true }
    const result = parseJSON(invalidStr, fallback)
    expect(result).toEqual(fallback)
  })
})
