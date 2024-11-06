import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthdate',
})
export class BirthdatePipe implements PipeTransform {
  /**
   * Transforms a birthdate string into a formatted birthdate string (e.g: '01/01/2000').
   * @param birthdate The birthdate string to be transformed.
   * @returns A formatted birthdate string in the format DD/MM/YYYY
   */
  public transform(birthdate: string): string {
    if (birthdate) {
      const value = birthdate.toString().replace(/\D/g, '');

      let formattedDate = '';

      if (value.length >= 8) {
        formattedDate = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');

      } else if (value.length >= 4) {
        formattedDate = value.replace(/(\d{2})(\d{2})/, '$1/$2/');

      } else if (value.length >= 2) {
        formattedDate = value.replace(/(\d{2})/, '$1/');

      } else {
        formattedDate = value;
      }
      return formattedDate;
    }
    return '';
  }
}
