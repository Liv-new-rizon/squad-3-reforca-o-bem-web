import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailError = ''; // O TypeScript já infere que é uma string
  public passwordError = ''; // O TypeScript já infere que é uma string
  public emailNotRegistered = false; // O TypeScript já infere que é um boolean
  public loginError = ''; // O TypeScript já infere que é uma string

  public constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [ // Remove o tipo explícito
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl('', [ // Remove o tipo explícito
        Validators.required, 
        Validators.minLength(8)
      ]),
      rememberMe: new FormControl(false) // Remove o tipo explícito
    });
  }

  public ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  public validateEmail(): void {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.invalid) {
      this.emailError = 'E-mail inválido. O e-mail deve seguir o formato: exemplo@dominio.com';
      this.emailNotRegistered = false;
    } else {
      this.emailError = '';
      this.checkEmailExists();
    }
  }

  public checkEmailExists(): void {
    const registeredEmails = [''];  // falta o banco de dados de email e senha
    const email = this.loginForm.get('email')?.value;

    if (email && !registeredEmails.includes(email)) {
      this.emailError = 'Conta não encontrada. Deseja realizar seu cadastro?';
      this.emailNotRegistered = true;
    } else {
      this.emailError = '';  
      this.emailNotRegistered = false;  
    }
  }

  public validatePassword(): void {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.invalid) {
      this.passwordError = 'A senha possui mínimo de 8 dígitos. Tente novamente';
    } else {
      this.passwordError = '';
    }
  }

  public login(): void {
    if (this.loginForm.valid) {
      const { email, rememberMe } = this.loginForm.value; // Removi o password aqui já que não está sendo usado

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }
      // falta o banco de dados de email e senha para fazer a lógica de verificação
    }
  }

  public navigateToRegister(): void {
    alert('pagina de cadastro');
    // this.router.navigate(['/']);
  }

  public forgotPassword(): void {
    alert('pagina de recuperar a senha');
    // this.router.navigate(['/']); 
  }
}

