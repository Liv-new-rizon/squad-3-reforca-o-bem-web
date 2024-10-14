import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar o Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  isPasswordVisible = false;

  emailError = '';
  passwordError = '';
  loginError = '';
  isFormValid = false;

  constructor(private router: Router) {}  // Injetar o Router

  ngOnInit() {
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  // Validação de e-mail
  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.emailError = 'E-mail inválido';
    } else {
      this.emailError = '';
      // Verificar se e-mail já existe na base de dados (simulação)
      this.checkEmailExists();
    }
    this.updateFormValidity();
  }

  // Simulação de verificação de e-mail
  checkEmailExists() {
    // Aqui você pode integrar com um serviço real
    const registeredEmails = ['teste@dominio.com'];
    if (!registeredEmails.includes(this.email)) {
      this.emailError = '';
    }
  }

  // Validação de senha
  validatePassword() {
    if (this.password.length < 8) {
      this.passwordError = 'A senha possui mínimo de 8 dígitos. Tente novamente';
    } else {
      this.passwordError = '';
    }
    this.updateFormValidity();
  }

  // Alternar visibilidade da senha
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Atualiza a validade geral do formulário
  updateFormValidity() {
    this.isFormValid = this.emailError === '' && this.passwordError === '' && this.email !== '' && this.password !== '';
  }

  // Ação de login
  login() {
    // Verificar a opção "Lembrar de mim"
    if (this.rememberMe) {
      localStorage.setItem('rememberMe', this.email);
    } else {
      localStorage.removeItem('rememberMe');
    }

    // Validações finais e ação de login (pode integrar com um serviço real)
    if (this.email === 'teste@dominio.com' && this.password === 'password123') {
      this.loginError = '';
      this.router.navigate(['/dashboard']);  // Redirecionar para a tela inicial
    } else {
      this.loginError = 'Senha incorreta. Tente novamente ou prossiga para a seção "Esqueceu sua senha?"';
    }
  }

  // Ações de navegação
  navigateToRegister() {
    this.router.navigate(['/register']);  // Navega para a página de cadastro
  }

  forgotPassword() {
    if (!this.emailError) {
      this.router.navigate(['/forgot-password']);  // Navega para a seção de redefinição de senha
    }
  }
}
