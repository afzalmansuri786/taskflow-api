export interface TaskInput {
  title: string;
  description: string;
  status?: string;
}

export type TaskFilterInput = Partial<TaskInput>