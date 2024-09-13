import { AbstractControl, FormControl } from '@angular/forms';

export function doPasswordMatch(c: AbstractControl) {
  if (c.get('password')?.value !== c.get('confirmPassword')?.value) {
    return { passwordMatchError: true };
  } else {
    return null;
  }
}
