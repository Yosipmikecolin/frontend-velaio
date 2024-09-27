import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DataTask } from 'src/interfaces';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: DataTask[] = [];
  type: string = 'completed';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  async getTasks() {
    const data = await this.apiService.getTasks();
    this.tasks = data;
  }

  async updatedTasks(idTask: number) {
    try {
      await this.apiService.updateTask(idTask);
      await this.getTasks();
    } catch (error) {
      alert('Error al actualizar la tarea');
    }
  }

  changeView(type: 'completed' | 'incomplete') {
    this.type = type;
  }

  getIncompleteTasks() {
    return this.tasks.filter((item) => item.task.completed === false);
  }
  getCompletedTasks() {
    return this.tasks.filter((item) => item.task.completed === true);
  }
}
