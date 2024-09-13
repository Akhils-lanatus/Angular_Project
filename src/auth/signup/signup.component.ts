import { Component, inject, OnInit } from '@angular/core';
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
  signupForm!: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
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
  //     (this.signupForm.get('confirmPassword')?.value as string)?.trim() === ''
  //   ) {
  //     return window.confirm(
  //       'Want to continue without completing registration 😢😢'
  //     );
  //   } else {
  //     return true;
  //   }
  // }

  handleSubmit() {
    this.signupForm.reset();
    this.router.navigate(['auth', 'login']);
  }
}
