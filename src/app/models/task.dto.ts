import { TaskStatus } from './task.model';

export interface TaskCreateRequest {
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface TaskUpdateRequest extends TaskCreateRequest {
  id: string;
}
