import { Component, OnInit } from '@angular/core';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import { TaskService } from '../../service/TaskService/task.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CustomResponseAlert } from '../../shared/CustomAlert/custom-alert.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiErrorService } from '../../service/ApiError/api-error.service';
import { ViewSelectedTaskComponent } from '../view-selected-task/view-selected-task.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CreateTaskComponent,
    DatePipe,
    CustomResponseAlert,
    AsyncPipe,
    ViewSelectedTaskComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  tasks: ITask[] = [];
  isLoading: boolean = false;
  isUpdateState: boolean = false;
  isViewState: boolean = false;
  errorMessage: string = '';
  selectedTask: ITask = {
    title: '',
    assignedTo: '',
    taskCreatedAT: new Date(),
    description: '',
    priority: 'Low',
    status: 'Open',
  };
  ngOnInit(): void {
    this.taskService.fetchAllTasks().subscribe({
      next: (x) => (this.tasks = x),
      error: (error: HttpErrorResponse) => {
        this.errorFunc(error);
      },
    });
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

  constructor(
    private taskService: TaskService,
    private errorMessageService: ApiErrorService
  ) {}

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
    this.taskService.fetchAllTasks().subscribe({
      next: (x) => (this.tasks = x),
      error: (error: HttpErrorResponse) => {
        this.errorMessage = this.errorMessageService.getErrorMessage(error);
        this.isLoading = false;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
    });
  }

  closeViewModal() {
    this.isViewState = false;
    this.selectedTask = {
      title: '',
      assignedTo: '',
      taskCreatedAT: new Date(),
      description: '',
      priority: 'Low',
      status: 'Open',
    };
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
          error: (error: HttpErrorResponse) => {
            this.errorFunc(error);
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
        error: (error: HttpErrorResponse) => {
          this.errorFunc(error);
        },
      });
    } else {
      this.taskService.postTask(payload).subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.closeAddTask(res);
        },
        error: (error: HttpErrorResponse) => {
          this.errorFunc(error);
        },
      });
    }
  }

  updateTask(data: ITask) {
    this.shouldRenderCreateTask = true;
    this.updateDataValue = data;
    this.isUpdateState = true;
  }

  fetchSelectedTask(id: string | undefined) {
    if (id) {
      this.taskService.fetchSelectedTask(id).subscribe({
        next: (data) => {
          (this.selectedTask = data), (this.isViewState = true);
        },
        error: (error: HttpErrorResponse) => {
          this.errorFunc(error);
        },
      });
    }
  }

  errorFunc(error: HttpErrorResponse) {
    this.errorMessage = this.errorMessageService.getErrorMessage(error);
    this.isLoading = false;
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }
  deleteAllTasks() {
    //TODO: delete all tasks same like deleteTask , only mongoose method changes
  }
}
