import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent {
  @Input() label!: string;
  @Input() formControl!: FormControl;
  @Input() errorMessages!: { [key: string]: string };

  public hide = true;
}
