import styled from 'styled-components'
import { useCountDownContext } from '../hooks/useCountDownContex'

export function History() {
  const { cycles } = useCountDownContext()

  return (
    <HistoryContainer>
      <h1>HISTORY</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.for} minutes</td>
                  <td>{cycle.startDate.toDateString()}</td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Done</Status>
                    )}
                    {cycle.interruptionDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptionDate && (
                      <Status statusColor="yellow">Running</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}

const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(p) => p.theme['gray-100']};
  }
`

const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${(p) => p.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(p) => p.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${(p) => p.theme['gray-700']};
      border-top: 4px solid ${(p) => p.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        padding-left: 1.5rem;
        width: 50%;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

interface StatusProps {
  statusColor: 'yellow' | 'red' | 'green'
}

const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(p) => p.theme[`${p.statusColor}-500`]};
  }
`
