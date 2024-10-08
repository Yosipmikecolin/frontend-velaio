export interface DataTask {
  id: number;
  task: Task;
  people: People[];
}

export interface People {
  name: string;
  age: number;
  skills: string[];
}

export interface Task {
  taskName: string;
  dueDate: Date;
  completed: boolean;
}
