import { Component, inject, OnDestroy } from '@angular/core';
import { FormErrorService } from '../../service/FormError/form-error.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/AuthService/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  formErrorService: FormErrorService = inject(FormErrorService);
  http: HttpClient = inject(HttpClient);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  isLoading: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('akhilshah1902@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('1911', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(12),
    ]),
  });

  getError(controlName: string, controlLabel?: string): string {
    const control = this.loginForm.get(controlName) as FormControl;
    return this.formErrorService.getError(control, controlLabel);
  }
  shouldShowError(controlName: string): boolean {
    const control = this.loginForm.get(controlName) as FormControl;
    return this.formErrorService.shouldShowError(control);
  }
  private sub!: Subscription;

  handleSubmit() {
    this.isLoading = true;
    this.sub = this.authService.loginUser(this.loginForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
