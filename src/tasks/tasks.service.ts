import { HttpException, Injectable } from '@nestjs/common';
import { AddTaskInput } from 'src/dto/create-todo.dto';
import { TASKS } from 'src/mocks/tasks.mock';
import { Task } from 'src/models/task.model';

@Injectable()
export class TasksService {
  tasks = TASKS;

  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    return this.tasks.find((task) => +task.id === id);
  }

  async addTask(input: AddTaskInput): Promise<Task[]> {
    const lastTask = this.tasks.slice(-1).pop();
    console.log(lastTask);
    const task: Task = {
      id: lastTask.id + 1,
      title: input.title,
      description: input.description,
      completed: false,
    };

    this.tasks.push(task);
    return this.tasks;
  }

  deleteTask(id: string): Task[] {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    if (taskIndex === -1) {
      throw new HttpException('Task not found', 404);
    }

    this.tasks.splice(taskIndex, 1);
    return this.tasks;
  }
}
