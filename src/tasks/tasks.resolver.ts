import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AddTaskInput } from 'src/dto/create-todo.dto';
import { Task } from 'src/models/task.model';
import { TasksService } from './tasks.service';

@Resolver('Tasks')
export class TasksResolver {
  constructor(private readonly taskService: TasksService) {}

  @Query(() => [Task])
  async getTasks() {
    return this.taskService.getTasks();
  }

  @Query(() => Task)
  async getTask(@Args('id') id: string) {
    return this.taskService.getTask(+id);
  }

  @Mutation(() => [Task])
  async addTask(@Args('input') input: AddTaskInput) {
    return this.taskService.addTask(input);
  }

  @Mutation(() => [Task])
  async deleteTask(@Args('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
