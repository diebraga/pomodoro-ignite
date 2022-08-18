import { useContext } from 'react'
import { CountDownContext } from '../contexts/ContdownContex'

export function useCountDownContext() {
  const context = useContext(CountDownContext)

  return context
}
