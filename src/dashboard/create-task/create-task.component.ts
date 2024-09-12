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
  @Output() onCloseBtnClick: EventEmitter<ITaskSuccessResponse> =
    new EventEmitter<ITaskSuccessResponse>();
  errorService: FormErrorService = inject(FormErrorService);
  taskService: TaskService = inject(TaskService);
  @Input() updateDataValue!: ITask;

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

  isUpdateState: boolean = false;
  isLoading: boolean = false;

  ngOnInit(): void {
    if (Boolean(this.updateDataValue.title)) {
      this.isUpdateState = true;
      this.taskForm.patchValue(this.updateDataValue);
      this.taskForm
        .get('createdAt')
        ?.patchValue(
          formatDate(this.updateDataValue.createdAt, 'yyyy-MM-dd', 'en')
        );
    }
    this.taskService.isLoading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
  }

  getError(controlName: string, controlLabel?: string): string {
    const control = this.taskForm.get(controlName) as FormControl;
    return this.errorService.getError(control, controlLabel);
  }

  handleSubmit() {
    if (this.isUpdateState) {
      let _id = this.updateDataValue._id;
      const payload = { ...this.taskForm.value, _id };
      this.taskService.updateTask(payload).subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.onCloseBtnClick.emit(res);
        },
      });
    } else {
      this.taskService.postTask(this.taskForm.value).subscribe({
        next: (res: ITaskSuccessResponse) => {
          this.onCloseBtnClick.emit(res);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.isUpdateState = false;
    this.updateDataValue = {
      title: '',
      assignedTo: '',
      createdAt: new Date(),
      description: '',
      priority: 'Low',
      status: 'Open',
    };
  }
}
