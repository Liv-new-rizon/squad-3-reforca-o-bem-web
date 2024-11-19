import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_PATTERN } from 'src/app/core/constants/regex-patterns';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';

/**
 * @component LoginComponent
 * Component responsible for the login screen of the application.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Login form.
   */
  public loginForm: FormGroup;

  /**
   * Error message for the email field.
   */
  public emailError = '';

  /**
   * Error message for the password field.
   */
  public passwordError = '';

  /**
   * Flag indicating if the email is not registered.
   */
  public emailNotRegistered = false;

  /**
   * General error message for login.
   */
  public loginError = '';

  /**
   * Flag for showing/hiding password.
   */
  public hide = true; // Adicionando a propriedade hide

  /**
   * @param fb - Form builder service to create and manage the form
   * @param router - Service for navigation
   */
  public constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required, 
        Validators.pattern(EMAIL_PATTERN)
      ]),
      password: new FormControl('', [ 
        Validators.required, 
        Validators.minLength(8)
      ]),
      rememberMe: new FormControl(false)
    });
  }

  /**
   * Initializes the component. Checks for saved email in localStorage.
   */
  public ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  /**
   * Validates the email field and sets an error message if invalid.
   */
  public validateEmail(): void {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.invalid) {
      this.emailError = 'E-mail inválido.';
      this.emailNotRegistered = false;
    } else {
      this.emailError = '';
    }
  }

  /**
   * Validates the password field and sets an error message if invalid.
   */
  public validatePassword(): void {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.invalid) {
      this.passwordError = 'A senha deve ter pelo menos 8 caracteres.';
    } else {
      this.passwordError = '';
    }
  }

  /**
   * Handles the login process, saving the email in localStorage if necessary.
   */
  public async login(): Promise<void> {
    this.loadingService.show();
    try {
      const response = await this.authService.loginUser<{ token: string }>(this.loginForm.value);

      if (this.loginForm.value.rememberMe) {
        localStorage.setItem('authToken', response.token);
      } else {
        sessionStorage.setItem('authToken', response.token);
      }
      this.navigateToStudentRegistration();
    } catch (error) {
      this.showErrorMessage("Conta não encontrada");
    } finally {
      this.loadingService.hide();
    }
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
   * Navigates to the signup page.
   */
  public navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  /**
   * Navigates to the student registration page.
   */
  public navigateToStudentRegistration(): void {
    this.router.navigate(['/student-registration']);
  }

  /**
   * Navigates to the password recovery page.
   */
  public forgotPassword(): void {
    alert('pagina de recuperar a senha');
  }

  /**
   * Toggles the visibility of the password.
   */
  public clickEvent(event: MouseEvent): void {
    this.hide = !this.hide;
  }
}

