import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask } from '../../Models/global';
import { TaskService } from '../../service/TaskService/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  taskList: ITask[] = [];
  ngOnInit(): void {
    this.taskService.getAllTask().subscribe((x) => this.taskList.push(x));
  }
  shouldRenderCreateTask: boolean = false;
  openAddTask() {
    this.shouldRenderCreateTask = true;
  }
  closeAddTask(data: ITask) {
    this.taskService.createNewTask(data);
    this.shouldRenderCreateTask = false;
  }
}
