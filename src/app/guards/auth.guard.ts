import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');  // Aqui, verificamos se há um token de autenticação

    if (token) {
      return true;  // Se houver token, o usuário está autenticado
    } else {
      this.router.navigate(['/login']);  // Redireciona para a página de login se não estiver autenticado
      return false;
    }
  }
}
