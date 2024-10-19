import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
  public constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required, 
        Validators.email
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
      this.emailError = 'E-mail inválido. O e-mail deve seguir o formato: exemplo@dominio.com';
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
      this.passwordError = 'A senha possui mínimo de 8 dígitos. Tente novamente';
    } else {
      this.passwordError = '';
    }
  }

  /**
   * Handles the login process, saving the email in localStorage if necessary.
   */
  public login(): void {
    if (this.loginForm.valid) {
      const { email, rememberMe } = this.loginForm.value; 

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }
    }
  }

  /**
   * Navigates to the registration page.
   */
  public navigateToRegister(): void {
    alert('pagina de cadastro');
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
    this.hide = !this.hide; // Alterna o valor de hide
  }
}

