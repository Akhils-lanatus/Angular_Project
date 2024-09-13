import { Injectable } from '@angular/core';
import { ITask, ITaskSuccessResponse } from '../../Models/global';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  fetchAllTasks(): Observable<ITask[]> {
    this.isLoadingSubject.next(true);
    return this.httpClient
      .get<{ response: ITask[] }>('http://localhost:3000/api/v1/task/get-task')
      .pipe(
        map((res) => res.response),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          return throwError(() => err);
        }),
        tap(() => this.isLoadingSubject.next(false))
      );
  }
  postTask(data: ITask): Observable<ITaskSuccessResponse> {
    this.isLoadingSubject.next(true);
    return this.httpClient
      .post<ITaskSuccessResponse>(
        'http://localhost:3000/api/v1/task/post-task',
        data
      )
      .pipe(tap(() => this.isLoadingSubject.next(false)));
  }
  updateTask(data: ITask): Observable<ITaskSuccessResponse> {
    this.isLoadingSubject.next(true);

    return this.httpClient
      .patch<ITaskSuccessResponse>(
        'http://localhost:3000/api/v1/task/update-task/' + data._id,
        data
      )
      .pipe(tap(() => this.isLoadingSubject.next(false)));
  }
  deleteTask(id: string) {
    this.isLoadingSubject.next(true);

    return this.httpClient
      .delete<ITaskSuccessResponse>(
        `http://localhost:3000/api/v1/task/delete-post/${id}`
      )
      .pipe(tap(() => this.isLoadingSubject.next(false)));
  }
  fetchSelectedTask(id: string) {
    this.isLoadingSubject.next(true);
    return this.httpClient
      .get<{ response: ITask }>(
        'http://localhost:3000/api/v1/task/get-selected-task/' + id
      )
      .pipe(
        map((res) => res.response),
        tap(() => this.isLoadingSubject.next(false))
      );
  }
}
