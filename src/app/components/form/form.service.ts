import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DataTask, Task } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api/create-task';
  constructor(private http: HttpClient) {}

  async postData(data: DataTask): Promise<Task> {
    try {
      const response = await firstValueFrom(
        this.http.post<Task>(this.apiUrl, data)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
