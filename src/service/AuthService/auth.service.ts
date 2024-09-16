import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { ApiAuthResponse, UserRegisterData } from '../../Models/global';
import { User } from '../../Models/User';
interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private toastr = inject(ToastrService);
  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  registerUser(data: UserRegisterData): Observable<ApiAuthResponse> {
    return this.http
      .post<ApiAuthResponse>('http://localhost:3000/api/v1/auth/register', data)
      .pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, 'Error');
          return throwError(() => err);
        })
      );
  }

  loginUser(data: LoginData): Observable<ApiAuthResponse> {
    return this.http
      .post<ApiAuthResponse>('http://localhost:3000/api/v1/auth/login', data, {
        withCredentials: true,
      })
      .pipe(
        map((data) => {
          this.toastr.success(data.message, 'Success');
          return data;
        }),
        catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error.message, 'Error');
          return throwError(() => err);
        }),
        tap((data) => {
          if (data._expiresIn && data.response?._id && data._token) {
            const expiresInTimestamp = data._expiresIn; // The timestamp in seconds
            const _expiresIn = new Date(expiresInTimestamp * 1000); // Convert to milliseconds
            const user = new User(
              data.response?._id,
              data.response?.email,
              data._token,
              _expiresIn
            );
            localStorage.setItem('authToken', JSON.stringify(data));
            this.user.next(user);
          }
        })
      );
  }

  checkIsLoggedIn() {
    const user: ApiAuthResponse = JSON.parse(localStorage.getItem('authToken'));
    if (!user) return;
    const _expiresIn = new Date(user._expiresIn * 1000);
    const loggedInUser = new User(
      user.response._id,
      user.response.email,
      user._token,
      _expiresIn
    );
    if (loggedInUser.getToken) {
      this.user.next(loggedInUser);
    }
  }
}
