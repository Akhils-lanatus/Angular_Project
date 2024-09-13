import { Component, inject } from '@angular/core';
import { FormErrorService } from '../../service/FormError/form-error.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formErrorService: FormErrorService = inject(FormErrorService);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
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

  handleSubmit() {
    console.log(this.loginForm.value);
  }
}
