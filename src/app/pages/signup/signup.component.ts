import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/)]);
  nameFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-záàâãéèêíïóôõöúüçñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÇÑ'\s]+$/), this.noWhiteSpaceValidator]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required, this.passwordsMatchValidator.bind(this)]);

  public noWhiteSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhiteSpace = (control.value || '').trim().length === 0;
    const isValid = !isWhiteSpace;
    return isValid ? null : { whitespace: true };
  }

  public passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    if (this.passwordFormControl && control.value !== this.passwordFormControl.value) {
      return { passwordsNotMatch: true };
    }
    return null;
  }

  ngOnInit() {
    this.passwordFormControl.valueChanges.subscribe(() => {
      this.confirmPasswordFormControl.updateValueAndValidity();
    });
  }

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  togglePasswordVisibility(event: MouseEvent) {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  toggleConfirmPasswordVisibility(event: MouseEvent) {
    this.hideConfirmPassword.set(!this.hideConfirmPassword());
    event.stopPropagation();
  }

  readonly dialog = inject(MatDialog);
  
  onSubmit() {
    if (
      this.nameFormControl.valid &&
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid
    ) {
      this.openSuccessDialog();
    }
  }

  openSuccessDialog() {
    this.dialog.open(SuccessDialogComponent);
  }
}

@Component({
  selector: 'app-success-dialog',
  template: `
    <h2 mat-dialog-title>Cadastro prévio realizado com sucesso</h2>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close class="close-button">Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`.close-button{color:white !important; background-color:#65558F !important}`]
})
export class SuccessDialogComponent {}
