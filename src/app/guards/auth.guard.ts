import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public constructor(private router: Router) {}

  public canActivate(): boolean {
    const token = localStorage.getItem('authToken');  

    if (token) {
      return true; 
    } else {
      this.router.navigate(['/login']);  
      return false;
    }
  }
}
