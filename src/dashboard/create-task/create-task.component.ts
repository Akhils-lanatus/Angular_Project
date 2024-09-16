import { DatePipe, formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Output,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import { FormErrorService } from '../../service/FormError/form-error.service';
import { TaskService } from '../../service/TaskService/task.service';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  @Output() handleFormSubmit: EventEmitter<ITask> = new EventEmitter<ITask>();
  errorService: FormErrorService = inject(FormErrorService);
  taskService: TaskService = inject(TaskService);
  @Input() updateDataValue!: ITask;
  @Input() isUpdateState: boolean = false;
  @Input() isLoading: boolean = false;

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    description: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    taskCreatedAT: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    priority: new FormControl('Low'),
    status: new FormControl('Open'),
  });

  shouldShowError(controlName: string): boolean {
    const control = this.taskForm.get(controlName) as FormControl;
    return this.errorService.shouldShowError(control);
  }

  ngOnInit(): void {
    if (this.isUpdateState) {
      this.taskForm.patchValue(this.updateDataValue);
      this.taskForm
        .get('taskCreatedAT')
        ?.patchValue(
          formatDate(this.updateDataValue.taskCreatedAT, 'yyyy-MM-dd', 'en')
        );
    }
  }

  getError(controlName: string, controlLabel?: string): string {
    const control = this.taskForm.get(controlName) as FormControl;
    return this.errorService.getError(control, controlLabel);
  }

  handleSubmit() {
    const data = JSON.parse(localStorage.getItem('authToken'));
    const email = data.response.email;
    const payload = { ...this.taskForm.value, email };
    this.handleFormSubmit.emit(payload);
  }

  ngOnDestroy(): void {
    this.isUpdateState = false;
    this.updateDataValue = {
      title: '',
      assignedTo: '',
      taskCreatedAT: new Date(),
      description: '',
      priority: 'Low',
      status: 'Open',
    };
  }
}
