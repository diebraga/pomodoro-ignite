import styled from 'styled-components'
import { UseFormRegister } from 'react-hook-form'
import { CycleTypes, FormTypes } from '../../@types/CycleTypes'

interface Props {
  register: UseFormRegister<FormTypes>
  activeCycle: CycleTypes | undefined
}

export function NewCycleForm({ register, activeCycle }: Props) {
  return (
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
  )
}

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
