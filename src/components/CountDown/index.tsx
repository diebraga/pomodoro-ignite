import { differenceInSeconds } from 'date-fns'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { CycleTypes } from '../../@types/CycleTypes'
import { useCountDownContext } from '../../hooks/useCountDownContex'

export function Countdown() {
  const {
    activeCycle,
    amountSecondsPassed,
    cycleId,
    cycles,
    setCycles,
    setAmountSecondsPassed,
  } = useCountDownContext()

  const totalSeconds = activeCycle ? activeCycle.for * 60 : 0

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
