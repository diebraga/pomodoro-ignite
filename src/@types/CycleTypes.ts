import * as zod from 'zod'

export const newCycleValidationScheme = zod.object({
  task: zod.string().min(1, 'Your task must have a name'),
  for: zod
    .number()
    .min(5, `You can't create a task with less than 5 minutes`)
    .max(60, `You can't create a task more than 1 hour long`),
})

export type FormTypes = zod.infer<typeof newCycleValidationScheme>

export interface CycleTypes {
  id: string
  task: string
  for: number
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}
