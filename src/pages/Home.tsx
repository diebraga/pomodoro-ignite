import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { NewCycleForm } from '../components/NewCycleForm'
import { Countdown } from '../components/CountDown'
import {
  CycleTypes,
  FormTypes,
  newCycleValidationScheme,
} from '../@types/CycleTypes'
import { zodResolver } from '@hookform/resolvers/zod'

export function Home() {
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

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCyclo)}>
        <NewCycleForm activeCycle={activeCycle} register={register} />
        <Countdown
          activeCycle={activeCycle}
          amountSecondsPassed={amountSecondsPassed}
          cycleId={cycleId}
          setAmountSecondsPassed={setAmountSecondsPassed}
          cycles={cycles}
          setCycles={setCycles}
        />
        {activeCycle ? (
          <CountDownButton
            type="button"
            onClick={handleStopCycle}
            isActiveCycle
          >
            <HandPalm size={24} />
            Stop
          </CountDownButton>
        ) : (
          <CountDownButton
            type="submit"
            disabled={isSubmitFormDisabled}
            isActiveCycle={false}
          >
            <Play size={24} />
            Start
          </CountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

function isGreenOrRed(isActiveCycle: boolean): 'red' | 'green' {
  return isActiveCycle ? 'red' : 'green'
}

const CountDownButton = styled.button<{
  isActiveCycle: boolean
}>`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;

  background: ${(p) => p.theme[`${isGreenOrRed(p.isActiveCycle)}-500`]};
  color: ${(p) => p.theme['gray-100']};

  &:not(:disabled):hover {
    background: ${(p) => p.theme[`${isGreenOrRed(p.isActiveCycle)}-700`]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
