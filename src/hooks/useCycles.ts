import {
  CycleTypes,
  FormTypes,
  newCycleValidationScheme,
} from '../@types/CycleTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { differenceInSeconds } from 'date-fns'

function useCycles() {
  const [cycles, setCycles] = useState<CycleTypes[]>([])
  const [cycleId, setCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { register, handleSubmit, formState, reset } = useForm<FormTypes>({
    resolver: zodResolver(newCycleValidationScheme),
    defaultValues: {
      for: 0,
      task: '',
    },
  })

  const { errors, isSubmitting, isDirty } = formState

  const activeCycle = cycles.find((cycle) => cycle.id === cycleId)

  function handleCreateNewCyclo(data: FormTypes): void {
    const cycle: CycleTypes = {
      for: 1,
      id: String(cycles.length + 1),
      task: data.task,
      startDate: new Date(),
    }

    setCycles((curr) => [...curr, cycle])
    setCycleId(String(cycles.length + 1))
    setAmountSecondsPassed(0)
    reset()
  }

  function handleStopCycle(): void {
    setCycleId(null)

    setCycles((curr) =>
      curr.map((cycle) => {
        if (cycle.id === cycleId) {
          return {
            ...cycle,
            interruptionDate: new Date(),
          }
        } else return cycle
      }),
    )
  }

  const isSubmitFormDisabled = !isDirty || isSubmitting

  const totalSeconds = activeCycle ? activeCycle.for * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        const finishedCycle = (array: CycleTypes[]) =>
          array.map((cycle) => {
            if (cycle.id === cycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            } else return cycle
          })

        if (diff >= totalSeconds) {
          setAmountSecondsPassed(totalSeconds)
          setCycles((curr) => finishedCycle(curr))
          setCycleId(null)
        } else {
          setAmountSecondsPassed(diff)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [
    activeCycle,
    cycleId,
    cycles,
    setAmountSecondsPassed,
    setCycles,
    totalSeconds,
  ])

  useEffect(() => {
    if (errors.task) {
      alert(errors.task.message)
      return
    }
    if (errors.for) {
      alert(errors.for.message)
    }
  }, [errors])

  return {
    isSubmitFormDisabled,
    handleStopCycle,
    register,
    handleSubmit,
    activeCycle,
    handleCreateNewCyclo,
    cycles,
    minutesAmount,
    secondsAmount,
  }
}

export { useCycles }
