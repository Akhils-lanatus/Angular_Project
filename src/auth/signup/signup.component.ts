import { Component, DoCheck, inject, OnDestroy, OnInit } from '@angular/core';
import { FormErrorService } from '../../service/FormError/form-error.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { doPasswordMatch } from '../../shared/Validators/passwordMatch.validator';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/AuthService/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  formErrorService: FormErrorService = inject(FormErrorService);
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);
  signupForm!: FormGroup;
  isLoading: boolean = false;

  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        name: new FormControl('Akhil', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(12),
          Validators.nullValidator,
        ]),
        email: new FormControl('akhilshah1902@gmail.com', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('1911', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        confirm_password: new FormControl('1911', [Validators.required]),
      },
      { validators: doPasswordMatch }
    );
  }

  getError(controlName: string, controlLabel?: string): string {
    const control = this.signupForm.get(controlName) as FormControl;
    return this.formErrorService.getError(control, controlLabel);
  }
  shouldShowError(controlName: string): boolean {
    const control = this.signupForm.get(controlName) as FormControl;
    return this.formErrorService.shouldShowError(control);
  }

  //only for learning
  // hasUnsavedChanges() {
  //   if (
  //     (this.signupForm.get('email')?.value as string)?.trim() === '' ||
  //     (this.signupForm.get('password')?.value as string)?.trim() === '' ||
  //     (this.signupForm.get('confirm_password')?.value as string)?.trim() === ''
  //   ) {
  //     return window.confirm(
  //       'Want to continue without completing registration 😢😢'
  //     );
  //   } else {
  //     return true;
  //   }
  // }
  handleSubmit() {
    this.isLoading = true;
    this.authService.registerUser(this.signupForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['auth', 'login']);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
