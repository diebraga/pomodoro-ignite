import {
  BaseSyntheticEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
} from 'react'
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
  amountSecondsPassed: number
  cycleId: string | null
  cycles: CycleTypes[]
  setCycles: Dispatch<SetStateAction<CycleTypes[]>>
  setAmountSecondsPassed: Dispatch<SetStateAction<number>>
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
    amountSecondsPassed,
    cycleId,
    cycles,
    setCycles,
    setAmountSecondsPassed,
  } = useCycles()
  return (
    <CountDownContext.Provider
      value={{
        onSubmit: handleSubmit(handleCreateNewCyclo),
        isSubmitFormDisabled,
        handleStopCycle,
        register,
        activeCycle,
        amountSecondsPassed,
        cycleId,
        cycles,
        setCycles,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}
