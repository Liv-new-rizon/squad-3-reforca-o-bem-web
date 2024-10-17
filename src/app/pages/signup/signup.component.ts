import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors, FormGroup, FormBuilder} from '@angular/forms';
import { DialogService } from '../../core/services/dialog.service';
import { SignupValidators } from '../../core/validators/signup-validators';
import { NAME_PATTERN, EMAIL_PATTERN } from '../../core/constants/regex-patterns';
import { TObject } from '../../core/models/TObject';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public hidePassword = true;
  public hideConfirmPassword = true;
  
  public constructor(private fb: FormBuilder, private readonly dialogService: DialogService) {
    this.signupForm = this.fb.group({
      nameFormControl: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(NAME_PATTERN), 
        SignupValidators.noWhiteSpace
      ]),
      emailFormControl: new FormControl<string>('', [
        Validators.required, 
        Validators.pattern(EMAIL_PATTERN)
      ]),
      passwordFormControl: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      confirmPasswordFormControl: new FormControl<string>('', [
        Validators.required,
        SignupValidators.passwordsMatch
      ]),
    });
  }

  /**
   * @param controlName - The name of the form control (e.g: 'nameFormControl')
   * @returns The corresponding error message for the control's error
   */
  public getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    
    const errorMessages: { [key: string]: { [key: string]: string } } = {
      nameFormControl: {
        required: 'O nome completo é obrigatório.',
        pattern: 'O nome informado é inválido.',
        noWhiteSpace: 'O nome não deve conter espaços em branco.'
      },
      emailFormControl: {
        required: 'O e-mail é obrigatório.',
        pattern: 'O e-mail informado é inválido.'
      },
      passwordFormControl: {
        required: 'A senha é obrigatória.',
        minlength: 'A senha deve ter pelo menos 8 caracteres.'
      },
      confirmPasswordFormControl: {
        required: 'A confirmação da senha é obrigatória.',
        passwordsNotMatch: 'As senhas não correspondem.'
      }
    };
  
    for (const error in errorMessages[controlName]) {
      if (control?.hasError(error)) {
        return errorMessages[controlName][error];
      }
    }

    if (controlName === 'confirmPasswordFormControl' && this.signupForm.hasError('passwordsNotMatch')) {
      return errorMessages['confirmPasswordFormControl']['passwordsNotMatch'];
    }
    
    return '';
  }  

  /**
   * Sets up the component on initialization, including a listener for changes in the password control
   * Updates the validation for password confirmation when the password field changes
   */
  public ngOnInit() {
    this.signupForm.get('passwordFormControl')?.valueChanges.subscribe(() => {
      this.signupForm.get('confirmPasswordFormControl')?.updateValueAndValidity();
    });
  }

  //TODO:
  /**
   * Submits the signup form
   * If the form is valid, a success message is displayed
   */
  public onSubmit() {
    if (this.signupForm.valid) {
      this.showSuccessMessage();
    }
  }

  /**
   * Displays a success message using the dialog service
   * The message indicates that the signup was successfully completed
   */
  public showSuccessMessage() {
    this.dialogService.openInfoDialog({
      title: 'Cadastro prévio realizado com sucesso',
      buttonText: 'Fechar'
    });
  }
}
