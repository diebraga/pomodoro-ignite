import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect } from 'react'

const newCycleValidationScheme = zod.object({
  task: zod.string().min(1, 'Your task must have a name'),
  for: zod
    .number()
    .min(5, `You can't create a task with less than 5 minutes`)
    .max(60, `You can't create a task more than 1 hour long`),
})

export function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(newCycleValidationScheme),
  })

  const { errors, isSubmitting, isDirty } = formState

  function handleCreateNewCyclo(data: any) {
    console.log(data)
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
        <FormContainer>
          <label htmlFor="task">{"I'm Going to work on"}</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Give a name to your project"
            list="task-suggestion"
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
            {...register('for', { valueAsNumber: true })}
          />

          <span>Minutes</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Divider>:</Divider>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitFormDisabled}>
          <Play size={24} />
          Start
        </StartCountDownButton>
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

const StartCountDownButton = styled.button`
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

  background: ${(p) => p.theme['green-500']};
  color: ${(p) => p.theme['gray-100']};

  &:not(:disabled):hover {
    background: ${(p) => p.theme['green-700']};
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
