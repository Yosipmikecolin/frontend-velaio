import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  constructor(private apiService: ApiService) {}

  async getTasks() {
    const data = await this.apiService.getTasks();
    console.log('data', data);
  }
}
