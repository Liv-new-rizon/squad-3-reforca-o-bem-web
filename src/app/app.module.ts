import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';


import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DialogComponent } from './theme/components/dialog/dialog.component';
import { DialogService } from './core/services/dialog.service';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';
import { AuthService } from './core/services/auth.service';
import { LoadingComponent } from './theme/components/loading/loading.component';
import { LoadingService } from './core/services/loading.service';
import { PhonePipe } from './core/models/pipes/phone.pipe';
import { BirthdatePipe } from './core/models/pipes/birthdate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,   
    SignupComponent,  
    DialogComponent, 
    StudentRegistrationComponent,
    LoadingComponent,
    PhonePipe,
    BirthdatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,  
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,  
    MatDialogModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [DialogService, AuthService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
