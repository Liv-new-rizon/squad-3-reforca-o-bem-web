import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public emailError: string = '';
  public passwordError: string = '';
  public emailNotRegistered: boolean = false;
  public loginError: string = '';

  public constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required, 
        Validators.email
      ]),
      password: new FormControl<string>('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      rememberMe: new FormControl<boolean>(false)
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
      const { email, password, rememberMe } = this.loginForm.value;

      if (rememberMe) {
        localStorage.setItem('rememberMe', email);
      } else {
        localStorage.removeItem('rememberMe');
      }
      // falta o banco de dados de email e ssenha para fazer a logica de verificação
      //email para teste
      /*if (email === 'teste@dominio.com' && password === 'password123') {
        this.loginError = '';
        alert('pagina inicial');
        // this.router.navigate(['/']);
      } else {
        this.loginError = 'Senha incorreta. Tente novamente ou prossiga para a seção "Esqueceu sua senha?"';
      }*/
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
