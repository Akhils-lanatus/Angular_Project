import { Component, DoCheck, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import { TaskService } from '../../service/TaskService/task.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CustomResponseAlert } from '../../shared/CustomAlert/custom-alert.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CreateTaskComponent, DatePipe, CustomResponseAlert, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  tasks: ITask[] = [];
  isLoading: boolean = false;
  isUpdateState: boolean = false;
  ngOnInit(): void {
    this.taskService.fetchAllTasks().subscribe((x) => (this.tasks = x));
    this.taskService.isLoading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
  }
  updateDataValue: ITask = {
    title: '',
    assignedTo: '',
    taskCreatedAT: new Date(),
    description: '',
    priority: 'Low',
    status: 'Open',
  };

  shouldRenderAlert: boolean = false;
  shouldRenderCreateTask: boolean = false;
  successResponseMessage: string = '';

  constructor(private taskService: TaskService) {}

  //OPEN TASK FORM
  openAddTask() {
    this.shouldRenderCreateTask = true;
    this.isUpdateState = false;
  }
  //CLOSE TASK FORM
  closeAddTask(data: ITaskSuccessResponse) {
    this.successResponseMessage = data.message || '';
    this.shouldRenderCreateTask = false;
    this.shouldRenderAlert = true;
    this.isUpdateState = false;
    this.taskService.fetchAllTasks().subscribe((x) => (this.tasks = x));
  }

  hideResponseAlert() {
    this.shouldRenderAlert = false;
  }
  hideCreateTask() {
    this.shouldRenderCreateTask = false;
  }

  deleteTask(id: string | undefined) {
    if (id) {
      if (window.confirm('Are you sure u want to delete ' + id)) {
        this.taskService.deleteTask(id).subscribe({
          next: (x) => {
            if (x.success) {
              this.successResponseMessage = x.message || '';
              this.shouldRenderAlert = true;
              this.taskService
                .fetchAllTasks()
                .subscribe((x) => (this.tasks = x));
            }
          },
        });
      }
    }
  }

  //CREATE || UPDATE TASK
  handleFormSubmit(payload: ITask) {
    if (this.isUpdateState) {
      const updatedPayload = { ...payload, _id: this.updateDataValue._id };
      this.taskService.updateTask(updatedPayload).subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.closeAddTask(res);
        },
      });
    } else {
      this.taskService.postTask(payload).subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.closeAddTask(res);
        },
      });
    }
  }

  updateTask(data: ITask) {
    this.shouldRenderCreateTask = true;
    this.updateDataValue = data;
    this.isUpdateState = true;
  }
  deleteAllTasks() {
    //TODO: delete all tasks same like deleteTask , only mongoose method changes
  }
}
