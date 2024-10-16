import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SignupValidators {
  public static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : { whitespace: true };
  }

  public static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const form = control.parent;
    if (!form) {
      return null;
    }
    const password = form.get('passwordFormControl');
    const confirmPassword = form.get('confirmPasswordFormControl');
    if (!confirmPassword?.value) {
      return null;
    }
    if (password && confirmPassword.value !== password.value) {
      return { passwordsNotMatch: true };
    }
    return null;
  }
}