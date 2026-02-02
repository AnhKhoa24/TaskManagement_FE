import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
   selector: 'app-task',
   standalone: true,
   imports: [CommonModule, FormsModule],
   templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
   tasks = signal<Task[]>([]);

   isModalOpen = false;
   isEditMode = false;

   statuses: TaskStatus[] = ['Todo', 'Doing', 'Done'];

   form = {
      id: '',
      title: '',
      description: '',
      status: 'Todo' as TaskStatus
   };

   errorTitle = '';

   constructor(private taskService: TaskService) { }

   ngOnInit(): void {
      this.loadTasks();
   }

   loadTasks(): void {
      this.taskService.getTasks().subscribe({
         next: data => {
            console.log('Tasks:', data);
             this.tasks.set(data);
         },
         error: err => {
            console.error(err);
         }
      });
   }

   openAdd(): void {
      this.isEditMode = false;
      this.resetForm();
      this.isModalOpen = true;
   }

   openEdit(task: Task): void {
      this.isEditMode = true;
      this.form = {
         id: task.id,
         title: task.title,
         description: task.description ?? '',
         status: task.status
      };
      this.isModalOpen = true;
   }

   closeModal(): void {
      this.isModalOpen = false;
      this.errorTitle = '';
   }

   save(): void {
      if (!this.form.title.trim()) {
         this.errorTitle = 'Title không được để trống';
         return;
      }

      const action$ = this.isEditMode
         ? this.taskService.updateTask(this.form)
         : this.taskService.createTask(this.form);

      action$.subscribe(() => {
         this.closeModal();
         this.loadTasks();
      });
   }

   delete(id: string): void {
      if (!confirm('Xóa task này?')) return;

      this.taskService.deleteTask(id).subscribe(() => {
         this.loadTasks();
      });
   }

   resetForm(): void {
      this.form = {
         id: '',
         title: '',
         description: '',
         status: 'Todo'
      };
   }
}
