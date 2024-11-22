import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  public currentYear: number;

  public constructor(private router: Router) {
    this.currentYear = new Date().getFullYear();
  }

  /**
   * Sends the user to a determined section of the page.
   * @param sectionId The id of the sectiom that the user is going to be redirected
   */
  public scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);

    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }

  /**
   * Navigates to the login page.
   */
  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
