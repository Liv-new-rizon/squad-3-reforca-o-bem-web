import { AbstractControl, ValidationErrors } from "@angular/forms";

export class StudentValidators{
  public static date(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;

    if (value) {
      const parts = value.split('/');

      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);

      const dateOnGivenParameters = new Date(year, month, day);

      const yearMatches = dateOnGivenParameters.getUTCFullYear() === year;
      const monthMatches = dateOnGivenParameters.getUTCMonth() === month;
      const dayMatches = dateOnGivenParameters.getUTCDate() === day;

      const currentDate = new Date();
      const minDate = new Date(currentDate.getFullYear() - 100, currentDate.getMonth(), currentDate.getDate());
      const isDateInRange = dateOnGivenParameters >= minDate && dateOnGivenParameters <= currentDate;

      
      const isValid = value.length === 10 && yearMatches && monthMatches && dayMatches && isDateInRange;
      return isValid ? null : { invalidDate: true };
    }
    return null;
  }
}
