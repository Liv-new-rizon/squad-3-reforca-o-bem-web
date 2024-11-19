import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NAME_PATTERN } from 'src/app/core/constants/regex-patterns';
import { AuthService } from 'src/app/core/services/auth.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { FormErrorService } from 'src/app/core/services/form-error.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SignupValidators } from 'src/app/core/validators/signup-validators';

@Component({
  selector: 'app-tutor-registration',
  templateUrl: './tutor-registration.component.html',
  styleUrls: ['./tutor-registration.component.scss'],
})
export class TutorRegistrationComponent implements OnInit{
  public tutorForm: FormGroup;
  public classEntitys: string[] = [
    'sim', 'não'
  ];
  public subjectsOfExpertises: string[] = [
    'Língua Portuguesa', 'Inglês', 'Artes', 'Educação Física', 'Matemática', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia'
  ];
  public userName = ''

  public constructor(
    private router: Router,
    private loadingService: LoadingService,
    private readonly dialogService: DialogService, 
    private authService: AuthService,
    private formErrorService: FormErrorService,
  ) {
    this.tutorForm = new FormGroup({
      profession: new FormControl('', [
        Validators.required,
        Validators.pattern(NAME_PATTERN),
        SignupValidators.noWhiteSpace,
      ]),
      classEntity: new FormControl('', [
        Validators.required,
      ]),
      regionalCouncil: new FormControl({value: '', disabled: true}),
      documentNumber: new FormControl({value: '', disabled: true}),
      subjectsOfExpertise: new FormControl('', [
        Validators.required,
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
      type: new FormControl('tutor'),
    })
    this.setupFormValueChanges();
  }

  /**
   * It checks the errors in the control and returns the appropriate message based on the control's validation status.
   * 
   * @param controlName - The name of the form control (e.g: 'profession')
   * @returns The corresponding error message for the control's error
   */
  public getErrorMessage(controlName: string): string {
    return this.formErrorService.getErrorMessage(this.tutorForm, controlName);
  }

  /**
   * Initializes the page by fetching user information
   * If successful, sets the userName. If it fails redirects to login
   */
  public async ngOnInit(): Promise<void> {
    this.loadingService.show();
    try {
      const response = await this.authService.getUserInfo();
      this.userName = response.user.name;
    } catch (error) {
      this.showErrorMessage('Erro ao obter informações do usuário');
      if (error.status === 401) {
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
      }
      this.navigateToLogin();
    } finally {
      this.loadingService.hide();
    }
  }

  /**
   * Sets up value changes listener on the 'classEntity' field to dynamically enable or disable the 'regionalCouncil' and 'documentNumber' fields
   * based on the user's selection. Also, applies or removes required validators accordingly.
   */
  private setupFormValueChanges(): void {
    this.tutorForm.get('classEntity')?.valueChanges.subscribe(value => {
      const regionalCouncil = this.tutorForm.get('regionalCouncil');
      const documentNumber = this.tutorForm.get('documentNumber');

      if (value === 'sim') {
        regionalCouncil?.enable();
        documentNumber?.enable();
        regionalCouncil?.setValidators([Validators.required]);
        documentNumber?.setValidators([Validators.required]);
      } else {
        regionalCouncil?.disable();
        documentNumber?.disable();
        regionalCouncil?.clearValidators();
        documentNumber?.clearValidators();
        regionalCouncil?.setValue('');
        documentNumber?.setValue('');
      }

      regionalCouncil?.updateValueAndValidity();
      documentNumber?.updateValueAndValidity();
    });
  }

  /**
   * Checks if the 'regionalCouncil' and 'documentNumber' fields should be shown based on the selected value of the 'classEntity' field.
   * @returns 'true' if the user selected 'sim' for 'classEntity', indicating that additional professional fields should be displayed; otherwise, 'false'.
   */
  public showProfessionalFields(): boolean {
    return this.tutorForm.get('classEntity')?.value === 'sim';
  }

  /**
   * Verifies whether the form control is invalid by checking if the control is dirty or touched and contains validation errors
   * 
   * @param controlName The name of the form control
   * @returns 'true' if the control is invalid and has been touched or is dirty, otherwise 'false'
   */
  public isControlInvalid(controlName: string): boolean {
    const control = this.tutorForm.get(controlName);
    return !!(control?.invalid && (control.dirty || control.touched));
  }

  /**
   * Navigates to the login page.
   */
  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * Navigates to the home page.
   */
  public navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  /**
   * Submits the tutor form
   * If the form is valid, a success message is displayed
   */
  public async onSubmit(): Promise<void> {
    this.loadingService.show();
    try{
      await this.authService.signup(this.tutorForm.value, 'tutor');
      this.showSuccessMessage();
    } catch (error) {
      if (error.status === 400) {
        return this.showErrorMessage(error.error.message);
      }
      return this.showErrorMessage('Erro no cadastro');
    } finally {
      this.loadingService.hide();
    }
  }

  /**
   * Displays a success message using the dialog service
   * The message indicates that the student registration was successfully completed
   */
  public showSuccessMessage(): void {
    this.dialogService.openInfoDialog({
      title: 'Cadastro completo',
      buttonText: 'Fechar'
    }).pipe(take(1)).subscribe(() => {
      this.navigateToHome();
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
}