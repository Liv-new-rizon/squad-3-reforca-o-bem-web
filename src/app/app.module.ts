import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { SignupComponent } from './pages/signup/signup.component';
import { DialogComponent} from './theme/components/dialog/dialog.component';
import { DialogService } from './services/dialog.service';
import { FormFieldComponent } from './theme/components/form-field/form-field.component'
import { PasswordFieldComponent } from './theme/components/password-field/password-field.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    DialogComponent,
    FormFieldComponent,
    PasswordFieldComponent
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
    MatDialogModule
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
