import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ITask } from '../../Models/global';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-selected-task',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './view-selected-task.component.html',
  styleUrl: './view-selected-task.component.css',
})
export class ViewSelectedTaskComponent {
  @Output() closeViewModal: EventEmitter<void> = new EventEmitter<void>();
  @Input() selectedTask!: ITask;

  onClose() {
    this.closeViewModal.emit();
  }
}
