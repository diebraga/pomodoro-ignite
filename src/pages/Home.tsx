import { HandPalm, Play } from 'phosphor-react'
import styled from 'styled-components'
import { NewCycleForm } from '../components/NewCycleForm'
import { Countdown } from '../components/CountDown'
import { useCountDownContext } from '../hooks/useCountDownContex'

export function Home() {
  const { onSubmit, isSubmitFormDisabled, handleStopCycle, activeCycle } =
    useCountDownContext()

  return (
    <HomeContainer>
      <form onSubmit={onSubmit}>
        <NewCycleForm />
        <Countdown />
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
