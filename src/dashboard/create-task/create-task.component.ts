import { DatePipe, formatDate } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITask } from '../../Models/global';
@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  @Output() onCloseBtnClick: EventEmitter<ITask> = new EventEmitter<ITask>();

  taskForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    assignedTo: new FormControl('', Validators.required),
    createdAt: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    priority: new FormControl('Low', Validators.required),
    status: new FormControl('Open', Validators.required),
  });
  handleSubmit() {
    this.onCloseBtnClick.emit(this.taskForm.value);
  }
}
