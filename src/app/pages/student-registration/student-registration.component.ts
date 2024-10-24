import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent {
  public studentForm: FormGroup; 
  public dateControl: FormControl; 

  /**
   * Constructor for the StudentRegistrationComponent.
   * Initializes the form and the date control.
   * 
   */
  public constructor(private router: Router) {
    this.dateControl = new FormControl('', [
      Validators.required,
      this.dateValidator.bind(this) 
    ]);

    this.studentForm = new FormGroup({
      date: this.dateControl 
    });
  }

  /**
   * Navigates to the login page.
   */
  public navigateToLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * Applies a date mask to the input field.
   * 
   */
  public applyDateMask(event: Event) {
    const input = (event.target as HTMLInputElement).value; 
    if (!input) return;

    let formatted = input.replace(/\D/g, ''); 
    if (formatted.length >= 2) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`; 
    }
    if (formatted.length >= 5) {
      formatted = `${formatted.slice(0, 5)}/${formatted.slice(5, 9)}`;
    }
    this.dateControl.setValue(formatted); 
  }

  /**
   * Custom validator to ensure the date is valid and does not exceed today's date.
   * 
   */
  public dateValidator(control: AbstractControl): ValidationErrors | null {
    const inputValue = control.value || '';
    const digitsOnly = inputValue.replace(/\D/g, ''); 

    if (digitsOnly.length !== 8) {
      return { invalidDate: true };
    }

    const day = parseInt(digitsOnly.slice(0, 2), 10);
    const month = parseInt(digitsOnly.slice(2, 4), 10) - 1; 
    const year = parseInt(digitsOnly.slice(4, 8), 10);
    const inputDate = new Date(year, month, day);
    const today = new Date();

    if (inputDate > today) {
      return { dateTooFar: true };
    }

    return null;
  }

  /**
   * Captures the appropriate error message for the date input.
   * 
   */
  public getErrorMessage() {
    if (this.dateControl.hasError('required')) {
      return 'Data é obrigatória';
    }
    if (this.dateControl.hasError('invalidDate')) {
      return 'Dígitos insuficientes';
    }
    if (this.dateControl.hasError('dateTooFar')) {
      return 'Data inválida';
    }
    return '';
  }

  /**
   * Registers a new student with the form data.
   */
  public registerStudent() {
    if (this.studentForm.valid) {
      console.log('Formulário enviado com sucesso!', this.studentForm.value);
    } else {
      alert('Formulário inválido');
    }
  }
}

