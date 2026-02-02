import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'app/environments/environment';
import { Task } from '../models/task.model';
import {
  TaskCreateRequest,
  TaskUpdateRequest
} from '../models/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly baseUrl = `${environment.apiBaseUrl}/Task`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }

  createTask(request: TaskCreateRequest): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, request);
  }

  updateTask(request: TaskUpdateRequest): Observable<Task> {
    return this.http.put<Task>(this.baseUrl, request);
  }

  deleteTask(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
  }
}
