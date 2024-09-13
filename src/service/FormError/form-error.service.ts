import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormErrorService {
  shouldShowError(control: FormControl | FormArray): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  getError(control: FormControl, controlLabel?: string): string {
    if (control.errors) {
      if (control.errors?.['required']) {
        return `${controlLabel} is required`;
      } else if (control.errors?.['minlength']) {
        return `Minimum length for ${controlLabel} is ${control.errors?.['minlength'].requiredLength}`;
      } else if (control.errors?.['maxlength']) {
        return `Maximum length for ${controlLabel} is ${control.errors?.['maxlength'].requiredLength}`;
      } else if (control.errors?.['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }
}
