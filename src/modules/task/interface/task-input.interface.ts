export interface TaskInput {
  title: string;
  description: string;
  status?: string; // status is optional, defaults to 'pending'
}

export type TaskFilterInput = Partial<TaskInput>