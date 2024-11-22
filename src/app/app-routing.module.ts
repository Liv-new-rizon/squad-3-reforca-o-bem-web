import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard'; 
import { SignupComponent } from './pages/signup/signup.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { TutorRegistrationComponent } from './pages/tutor-registration/tutor-registration.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },  
  { path: 'student-registration', 
    component: StudentRegistrationComponent,
    canActivate: [AuthGuard]
  },
  { path: 'tutor-registration', 
    component: TutorRegistrationComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'landing-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]  
})
export class AppRoutingModule { }
