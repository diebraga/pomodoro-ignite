import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useCountDownContext } from '../../hooks/useCountDownContex'

export function Countdown() {
  const { activeCycle, minutesAmount, secondsAmount } = useCountDownContext()

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

  return (
    <CountDownContainer>
      <span>{timeDisplay().minutesFirstChar}</span>
      <span>{timeDisplay().minutesSecondChar}</span>
      <Divider>:</Divider>
      <span>{timeDisplay().secondsFirstChar}</span>
      <span>{timeDisplay().secondsSecondChar}</span>
    </CountDownContainer>
  )
}

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
