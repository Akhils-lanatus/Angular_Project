import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import { TaskService } from '../../service/TaskService/task.service';
import { DatePipe } from '@angular/common';
import { CustomResponseAlert } from '../../shared/CustomAlert/custom-alert.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, DatePipe, CustomResponseAlert],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  taskList: ITask[] = [];
  ngOnInit(): void {
    this.taskService.getAllTask().subscribe((x) => this.taskList.push(x));
  }
  shouldRenderAlert: boolean = false;
  shouldRenderCreateTask: boolean = false;
  openAddTask() {
    this.shouldRenderCreateTask = true;
  }
  successResponseMessage: string = '';
  closeAddTask(data: ITaskSuccessResponse) {
    this.successResponseMessage = data.message;
    this.taskService.createNewTask(data.response);
    this.shouldRenderCreateTask = false;
    this.shouldRenderAlert = true;
    console.log(this.shouldRenderAlert);
  }
  hideResponseAlert() {
    console.log('hi');

    this.shouldRenderAlert = false;
  }
}
