import { BaseSyntheticEvent, createContext, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { CycleTypes } from '../@types/CycleTypes'
import { useCycles } from '../hooks/useCycles'

interface CountDownProviderProp {
  children: ReactNode
}

interface CountDownContextProps {
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>
  isSubmitFormDisabled: boolean
  handleStopCycle: () => void
  register: UseFormRegister<{
    task: string
    for: number
  }>
  activeCycle: CycleTypes | undefined
  cycles: CycleTypes[]
  minutesAmount: number
  secondsAmount: number
}

export const CountDownContext = createContext({} as CountDownContextProps)

export function CountDownProvider({ children }: CountDownProviderProp) {
  const {
    handleSubmit,
    handleCreateNewCyclo,
    isSubmitFormDisabled,
    handleStopCycle,
    register,
    activeCycle,
    cycles,
    minutesAmount,
    secondsAmount,
  } = useCycles()
  return (
    <CountDownContext.Provider
      value={{
        onSubmit: handleSubmit(handleCreateNewCyclo),
        isSubmitFormDisabled,
        handleStopCycle,
        register,
        activeCycle,
        cycles,
        minutesAmount,
        secondsAmount,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}
