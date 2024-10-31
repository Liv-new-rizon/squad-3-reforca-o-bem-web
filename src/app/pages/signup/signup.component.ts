import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { DialogService } from '../../core/services/dialog.service';
import { SignupValidators } from '../../core/validators/signup-validators';
import { NAME_PATTERN, EMAIL_PATTERN } from '../../core/constants/regex-patterns';
import { TObject } from '../../core/models/interfaces/TObject';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public hidePassword = true;
  public hideConfirmPassword = true;
  
  public constructor(
    private fb: FormBuilder, 
    private readonly dialogService: DialogService, 
    private router: Router, 
    private authService: AuthService,
    private loadingService: LoadingService,
  ) {
    this.signupForm = this.fb.group({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(NAME_PATTERN), 
        SignupValidators.noWhiteSpace
      ]),
      email: new FormControl<string>('', [
        Validators.required, 
        Validators.pattern(EMAIL_PATTERN)
      ]),
      password: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl<string>('', [
        Validators.required,
        SignupValidators.passwordsMatch
      ]),
    });
  }

  /**
   * It checks the errors in the control and returns the appropriate message based on the control's validation status.
   * 
   * @param controlName - The name of the form control (e.g: 'name')
   * @returns The corresponding error message for the control's error
   */
  public getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      name: {
        required: 'O nome completo é obrigatório.',
        pattern: 'O nome informado é inválido.',
        whitespace: 'O nome não deve conter espaços em branco.'
      },
      email: {
        required: 'O e-mail é obrigatório.',
        pattern: 'O e-mail informado é inválido.',
      },
      password: {
        required: 'A senha é obrigatória.',
        minlength: 'A senha deve ter pelo menos 8 caracteres.'
      },
      confirmPassword: {
        required: 'A confirmação da senha é obrigatória.',
        passwordsNotMatch: 'As senhas não correspondem.'
      }
    };
  
    for (const error in errorMessages[controlName]) {
      if (control?.hasError(error)) {
        return errorMessages[controlName][error];
      }
    }

    if (controlName === 'confirmPassword' && this.signupForm.hasError('passwordsNotMatch')) {
      return errorMessages['confirmPassword']['passwordsNotMatch'];
    }
    
    return '';
  }  

  /**
   * Sets up the component on initialization, including a listener for changes in the password control
   * Updates the validation for password confirmation when the password field changes
   */
  public ngOnInit(): void {
    this.signupForm.get('password')?.valueChanges.subscribe(() => {
      this.signupForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  /**
   * Verifies whether the form control is invalid by checking if the control is dirty or touched and contains validation errors
   * 
   * @param controlName The name of the form control
   * @returns 'true' if the control is invalid and has been touched or is dirty, otherwise 'false'
   */
  public isControlInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  /**
   * Submits the signup form
   * If the form is valid, a success message is displayed
   */
  public async onSubmit(): Promise<void> {
    try {
      this.loadingService.show();
      await this.authService.signupUser(this.signupForm.value);
      this.showSuccessMessage();
    } catch (error) {
      if (error.status === 400) {
        return this.showErrorMessage(error.error.message);
      }
      this.showErrorMessage('Erro no cadastro');
    } finally {
      this.loadingService.hide();
    }
  }
  
  /**
   * Displays a success message using the dialog service
   * The message indicates that the signup was successfully completed
   */
  public showSuccessMessage(): void {
    this.dialogService.openInfoDialog({
      title: 'Cadastro prévio realizado com sucesso',
      buttonText: 'Fechar'
    }).pipe(take(1)).subscribe(() => {
      this.navigateToLogin();
    });
  }

  /**
   * Displays a error message using the dialog service
   * @param message The message indicating the error
   */
  private showErrorMessage(message: string): void {
    this.dialogService.openInfoDialog({
      title: message,
      buttonText: 'Fechar'
    });
  }

  /**
   * Navigates to the login page.
   */
  public navigateToLogin(): void {
    this.router.navigate(['/login'])
  }
}
