import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent {
  public constructor(private router: Router) {}
  /**
   * Navigates to the login page.
   */
  public navigateToLogin() {
    this.router.navigate(['/login'])
  }
}