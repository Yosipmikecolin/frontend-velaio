import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DataTask, Task } from 'src/interfaces';

export class TaskService {
  private apiUrl = 'http://localhost:5000/api/create-task';
  constructor(private http: HttpClient) {}

  async getTasks() {}
}
