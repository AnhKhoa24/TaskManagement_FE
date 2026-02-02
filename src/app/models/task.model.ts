export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}
