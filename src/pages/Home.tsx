import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useCallback, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleValidationScheme = zod.object({
  task: zod.string().min(1, 'Your task must have a name'),
  for: zod
    .number()
    .min(5, `You can't create a task with less than 5 minutes`)
    .max(60, `You can't create a task more than 1 hour long`),
})

type FormTypes = zod.infer<typeof newCycleValidationScheme>

interface CycloTypes {
  id: string
  task: string
  for: number
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<CycloTypes[]>([])
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

  function handleCreateNewCyclo(data: FormTypes): void {
    const cycle: CycloTypes = {
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
  console.log(cycles)
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

  const activeCycle = cycles.find((cycle) => cycle.id === cycleId)

  const totalSeconds = activeCycle ? activeCycle.for * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        const finishedCycle = (array: CycloTypes[]) =>
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
        } else {
          setAmountSecondsPassed(diff)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeCycle, cycleId, cycles, totalSeconds])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const timeDisplay = useCallback(() => {
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    return {
      minutesFirstChar: minutes.charAt(0),
      minutesSecondChar: minutes.charAt(1),
      secondsFirstChar: seconds.charAt(0),
      secondsSecondChar: seconds.charAt(1),
      minutes,
      seconds,
    }
  }, [minutesAmount, secondsAmount])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${timeDisplay().minutes}:${timeDisplay().seconds}`
    }
  }, [activeCycle, timeDisplay])

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
        <FormContainer>
          <label htmlFor="task">{"I'm Going to work on"}</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
            list="task-suggestion"
            disabled={!!activeCycle}
            {...register('task')}
          />

          <datalist id="task-suggestion">
            <option value="Proj 1" />
            <option value="Proj 2" />
            <option value="Proj 3" />
          </datalist>

          <label htmlFor="for">For</label>
          <MinutsAmountInput
            type="number"
            id="for"
            placeholder="00"
            step={5}
            disabled={!!activeCycle}
            {...register('for', { valueAsNumber: true })}
          />

          <span>Minutes</span>
        </FormContainer>

        <CountDownContainer>
          <span>{timeDisplay().minutesFirstChar}</span>
          <span>{timeDisplay().minutesSecondChar}</span>
          <Divider>:</Divider>
          <span>{timeDisplay().secondsFirstChar}</span>
          <span>{timeDisplay().secondsSecondChar}</span>
        </CountDownContainer>
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

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  justify-content: center;
  gap: 0.5rem;
  color: ${(p) => p.theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`

const CountDownContainer = styled.div`
  font-family: 'Roboto Mono' monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${(p) => p.theme['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${(p) => p.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

const Divider = styled.div`
  padding: 2rem 0;
  color: ${(p) => p.theme['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
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

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(p) => p.theme['gray-500']};
  font-size: 1.125rem;
  font-weight: bold;
  padding: 0 0.5rem;
  color: ${(p) => p.theme['gray-100']};

  &::placeholder {
    color: ${(p) => p.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-color: ${(p) => p.theme['gray-500']};
  }
`

const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

const MinutsAmountInput = styled(BaseInput)`
  width: 4rem;
`
