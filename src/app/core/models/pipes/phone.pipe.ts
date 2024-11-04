import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  /**
   * Transforms a phone string into a formatted phone string (e.g: '(81) 98888-8888')
   * @param tel The phone number string to be transformed.
   * @returns A formatted phone number string in the format (XX) XXXXX-XXXX
   */
  public transform(tel: string): string {
    if (tel) {
      const value = tel.toString().replace(/\D/g, '');

      let formattedPhone = '';

      if (value.length > 10) {
        formattedPhone = value.replace(/(\d{2})?(\d{5})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 9) {
        formattedPhone = value.replace(/(\d{2})?(\d{4})?(\d{4})/, '($1) $2-$3');

      } else if (value.length > 5) {
        formattedPhone = value.replace(/^(\d{2})?(\d{4})?(\d{0,4})/, '($1) $2-$3');

      } else if (value.length > 1) {
        formattedPhone = value.replace(/^(\d{2})?(\d{0,5})/, '($1) $2');

      } else {
        if (tel !== '') {formattedPhone = value.replace(/^(\d*)/, '($1');}
      }
      return formattedPhone;
    }
    return '';
  }
}
