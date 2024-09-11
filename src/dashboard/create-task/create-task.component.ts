import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import { FormErrorService } from '../../service/FormError/form-error.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  @Output() onCloseBtnClick: EventEmitter<ITaskSuccessResponse> =
    new EventEmitter<ITaskSuccessResponse>();
  errorService: FormErrorService = inject(FormErrorService);
  constructor(private httpClient: HttpClient) {}

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    createdAt: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    priority: new FormControl('Low'),
    status: new FormControl('Open'),
  });
  shouldShowError(controlName: string): boolean {
    const control = this.taskForm.get(controlName) as FormControl;
    return this.errorService.shouldShowError(control);
  }

  getError(controlName: string, controlLabel?: string): string {
    const control = this.taskForm.get(controlName) as FormControl;
    return this.errorService.getError(control, controlLabel);
  }
  handleSubmit() {
    this.httpClient
      .post<ITaskSuccessResponse>(
        'http://localhost:3000/api/v1/task/post-task',
        this.taskForm.value
      )
      .subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.onCloseBtnClick.emit(res);
        },
      });
  }
}
