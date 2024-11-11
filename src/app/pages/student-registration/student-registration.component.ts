import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { StudentValidators } from 'src/app/core/validators/student-validators';
import { LoadingService } from 'src/app/core/services/loading.service';
import { take } from 'rxjs/operators';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormErrorService } from 'src/app/core/services/form-error.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit{
  public studentForm: FormGroup;
  public subjectsOfInterests: string[] = [
    'Língua Portuguesa', 'Inglês', 'Artes', 'Educação Física', 'Matemática', 'Física', 'Química', 'Biologia', 'História', 'Geografia', 'Filosofia', 'Sociologia'
  ];
  public schoolTypes: string[] = [
    'Escola Pública', 'Escola Privada'
  ];
  public educationLevels: string[] = [
    'Ensino Médio (1º ano)', 'Ensino Médio (2º ano)', 'Ensino Médio (3º ano)'
  ];
  public userName = ''

  public constructor(
    private router: Router,
    private loadingService: LoadingService,
    private readonly dialogService: DialogService, 
    private authService: AuthService,
    private formErrorService: FormErrorService
  ) {
    this.studentForm = new FormGroup({
      birthDate: new FormControl('', [
        Validators.required,
        StudentValidators.date
      ]),
      educationLevel: new FormControl([], [
        Validators.required,
      ]),
      schoolType: new FormControl([], [
        Validators.required,
      ]),
      subjectsOfInterest: new FormControl([], [
        Validators.required,
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
      ]),
      type: new FormControl('student'),
    });
  }

  /**
   * It checks the errors in the control and returns the appropriate message based on the control's validation status.
   * 
   * @param controlName - The name of the form control (e.g: 'birthDate')
   * @returns The corresponding error message for the control's error
   */
  public getErrorMessage(controlName: string): string {
    return this.formErrorService.getErrorMessage(this.studentForm, controlName);
  }

  /**
   * Initializes the page by fetching user information
   * If successful, sets the userName. If it fails redirects to login
   */
  public async ngOnInit(): Promise<void> {
    try {
      this.loadingService.show();
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
   * Verifies whether the form control is invalid by checking if the control is dirty or touched and contains validation errors
   * 
   * @param controlName The name of the form control
   * @returns 'true' if the control is invalid and has been touched or is dirty, otherwise 'false'
   */
  public isControlInvalid(controlName: string): boolean {
    const control = this.studentForm.get(controlName);
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
   * Submits the student form
   * If the form is valid, a success message is displayed
   */
  public async onSubmit(): Promise<void> {
    try{
      this.loadingService.show();
      await this.authService.signupStudent(this.studentForm.value);
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

