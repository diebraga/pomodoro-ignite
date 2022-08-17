import {
  CycleTypes,
  FormTypes,
  newCycleValidationScheme,
} from '../@types/CycleTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

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
    amountSecondsPassed,
    cycleId,
    setCycles,
    cycles,
    setAmountSecondsPassed,
  }
}

export { useCycles }
