import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * @service AuthGuard
 * Guard that checks user authentication before route activation.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   * @param router - Router service to manage navigation
   */
  public constructor(private router: Router) {}

  /**
   * Validates if a user has a valid authentication token.
   * Redirects to the login page if no token is found.
   */
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
