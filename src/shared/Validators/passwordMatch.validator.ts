import { AbstractControl, FormControl } from '@angular/forms';

export function doPasswordMatch(c: AbstractControl) {
  if (c.get('password')?.value !== c.get('confirm_password')?.value) {
    return { passwordMatchError: true };
  } else {
    return null;
  }
}
