import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Usando FormGroup para gerenciar o formulário
  emailError = ''; 
  passwordError = '';
  emailNotRegistered = false;
  loginError = '';

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(8)]], 
      rememberMe: [false] 
    });
  }

  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  validateEmail() {
    if (this.loginForm.get('email')?.invalid) {
      this.emailError = 'E-mail inválido. O e-mail deve seguir o formato: exemplo@dominio.com';
      this.emailNotRegistered = false;
    } else {
      this.emailError = '';
      this.checkEmailExists();
    }
  }

  checkEmailExists() {
    const registeredEmails = ['teste@dominio.com'];  
    const email = this.loginForm.get('email')?.value;

    if (!registeredEmails.includes(email)) {
      this.emailError = 'Conta não encontrada. Deseja realizar seu cadastro?';
      this.emailNotRegistered = true; 
    } else {
      this.emailError = '';  
      this.emailNotRegistered = false;  
    }
  }

  validatePassword() {
    if (this.loginForm.get('password')?.invalid) {
      this.passwordError = 'A senha possui mínimo de 8 dígitos. Tente novamente';
    } else {
      this.passwordError = '';
    }
  }


  login() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }


      if (email === 'teste@dominio.com' && password === 'password123') {
        this.loginError = '';
        this.router.navigate(['/dashboard']); 
      } else {
        this.loginError = 'Senha incorreta. Tente novamente ou prossiga para a seção "Esqueceu sua senha?"';
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
      this.router.navigate(['/forgot-password']); 
  }
}
