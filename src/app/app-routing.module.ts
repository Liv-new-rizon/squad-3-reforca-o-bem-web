import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LoginComponent },  // Tela de login
  { path: 'register', component: RegisterComponent },  // Rota para cadastro
  { path: 'forgot-password', component: ForgotPasswordComponent },  // Rota para redefinir senha
  { path: 'dashboard', component: DashboardComponent },  // Rota para a tela inicial após o login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Usando forRoot para configurar as rotas principais
  exports: [RouterModule]
})
export class AppRoutingModule { }
