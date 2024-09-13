import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiErrorService {
  getErrorMessage(error: HttpErrorResponse) {
    console.log(error.error.message);
    return error.error.message || error.message;
  }
}
