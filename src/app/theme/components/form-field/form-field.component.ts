import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() type!: string;
  @Input() formControl!: FormControl;
  @Input() errorMessages!: { [key: string]: string };
}
