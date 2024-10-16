import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors, FormGroup} from '@angular/forms';
import { DialogService } from '../../services/dialog.service';
import { SignupValidators } from '../../core/validators/signup-validators';
import { NAME_PATTERN, EMAIL_PATTERN } from '../../core/constants/regex-patterns';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = new FormGroup({
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
    ])
  });

  public ngOnInit() {
    this.signupForm.get('passwordFormControl')?.valueChanges.subscribe(() => {
      this.signupForm.get('confirmPasswordFormControl')?.updateValueAndValidity();
    });
  }

  //TODO:
  public onSubmit() {
    if (this.signupForm.valid) {
      this.showSuccessMessage();
    }
  }

  public constructor(private readonly dialogService: DialogService) {}

  public showSuccessMessage() {
    this.dialogService.openInfoDialog({
      title: 'Cadastro prévio realizado com sucesso',
      buttonText: 'Fechar'
    });
  }
}
