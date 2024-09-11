import { Injectable } from '@angular/core';
import { ITask } from '../../Models/global';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskList: Subject<ITask> = new Subject<ITask>();
  constructor() {}
  getAllTask() {
    return this.taskList;
  }
  createNewTask(task: ITask) {
    this.taskList.next(task);
  }
}
