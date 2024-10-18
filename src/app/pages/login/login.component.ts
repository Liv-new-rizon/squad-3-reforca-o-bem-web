import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

/**
 * @component LoginComponent
 * Componente responsável pela tela de login da aplicação.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Formulário de login.
   * @type {FormGroup}
   */
  public loginForm: FormGroup;

  /**
   * Mensagem de erro para o campo de e-mail.
   * @type {string}
   */
  public emailError = '';

  /**
   * Mensagem de erro para o campo de senha.
   * @type {string}
   */
  public passwordError = '';

  /**
   * Indicador de e-mail não registrado.
   * @type {boolean}
   */
  public emailNotRegistered = false;

  /**
   * Mensagem de erro geral para o login.
   * @type {string}
   */
  public loginError = '';

  /**
   * Construtor do componente LoginComponent.
   * Inicializa o formulário e as validações.
   * 
   * @param {Router} router Serviço de roteamento para navegação.
   * @param {FormBuilder} fb Serviço para criar e gerenciar o formulário.
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
   * Inicializa o componente. Verifica se há um e-mail salvo no localStorage
   * e preenche o campo de e-mail se encontrado.
   * 
   * @returns {void}
   */
  public ngOnInit(): void {
    const savedEmail = localStorage.getItem('rememberMe');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  /**
   * Valida o campo de e-mail. Define uma mensagem de erro se o e-mail for inválido.
   * 
   * @returns {void}
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
   * Valida o campo de senha. Define uma mensagem de erro se a senha for inválida.
   * 
   * @returns {void}
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
   * Realiza o login quando o formulário é enviado. Salva o e-mail no localStorage 
   * se a opção "Lembrar de mim" estiver selecionada.
   * 
   * @returns {void}
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
   * Navega para a página de cadastro de novos usuários.
   * Exibe um alerta no momento, mas pode ser alterado para navegação futura.
   * 
   * @returns {void}
   */
  public navigateToRegister(): void {
    alert('pagina de cadastro');
    // this.router.navigate(['/']);
  }

  /**
   * Navega para a página de recuperação de senha.
   * Exibe um alerta no momento, mas pode ser alterado para navegação futura.
   * 
   * @returns {void}
   */
  public forgotPassword(): void {
    alert('pagina de recuperar a senha');
    // this.router.navigate(['/']);
  }
}

