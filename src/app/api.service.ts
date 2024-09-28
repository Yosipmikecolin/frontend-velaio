// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DataTask, Task } from 'src/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'https://api-velaio-9c0c00b8b82a.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  async getTasks(): Promise<DataTask[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<DataTask[]>(`${this.baseUrl}/get-tasks`)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async createTask(data: DataTask): Promise<Task> {
    try {
      const response = await firstValueFrom(
        this.http.post<Task>(`${this.baseUrl}/create-task`, data)
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id: number): Promise<Task> {
    try {
      const response = await firstValueFrom(
        this.http.put<Task>(`${this.baseUrl}/updated-task/${id}`, {})
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
