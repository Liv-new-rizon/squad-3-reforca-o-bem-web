import { AbstractControl, ValidationErrors } from '@angular/forms';

export class SignupValidators {
  /**
   * Custom Validator to form-fields, check if the value has white space on it.
   * 
   * @param control - The form control to validate
   * @returns ValidationErrors if the value is only white space; otherwise null
   */
  public static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : { whitespace: true };
  }

  /**
   * Custom Validator to check if the password and confirm password fields match.
   * 
   * @param control - The form control to validate
   * @returns ValidationErrors if the passwords do not match; otherwise null
   */
  public static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const form = control.parent;
    if (!form) {
      return null;
    }
    const password = form.get('passwordFormControl');
    const confirmPassword = form.get('confirmPasswordFormControl');
  
    if (confirmPassword?.value && password?.value !== confirmPassword.value) {
      return { passwordsNotMatch: true };
    }
    return null;
  }  
}