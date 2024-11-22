import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  private readonly errorMessages: { [key: string]: { [key: string]: string } } = {
    name: {
      required: 'O nome completo é obrigatório.',
      pattern: 'O nome informado é inválido.',
      whitespace: 'O campo não deve estar em branco.'
    },
    email: {
      required: 'O e-mail é obrigatório.',
      pattern: 'O e-mail informado é inválido.',
    },
    password: {
      required: 'A senha é obrigatória.',
      minlength: 'A senha deve ter pelo menos 8 caracteres.'
    },
    confirmPassword: {
      required: 'A confirmação da senha é obrigatória.',
      passwordsNotMatch: 'As senhas não correspondem.'
    },

    birthDate: { 
      required: 'A data de nascimento é obrigatória.',
      invalidDate: 'Data inválida.'
    },
    educationLevel: { 
      required: 'A escolaridade é obrigatória.' 
    },
    schoolType: { 
      required: 'O tipo de escola é obrigatório.' 
    },
    subjectsOfInterest: { 
      required: 'As matérias de interesse são obrigatórias.' 
    },
    phoneNumber: { 
      required: 'O número de telefone é obrigatório.',
      minlength: 'O número deve ter 11 dígitos.'
    },

    profession: { 
      required: 'A profissão é obrigatória.',
      pattern: 'O nome informado é inválido.',
      whitespace: 'O campo não deve estar em branco.'
    },
    classEntity: { 
      required: 'Esse campo é obrigatório.' 
    },
    regionalCouncil: { 
      required: 'A entidade de classe é obrigatória.' 
    },
    documentNumber: { 
      required: 'Esse campo é obrigatório.' 
    },
    subjectsOfExpertise: {
      required: 'As matérias são obrigatórias.'
    },
  };

  public getErrorMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);
    
    if (!control) return '';

    if (controlName === 'confirmPassword' && form.hasError('passwordsNotMatch')) {
      return this.errorMessages['confirmPassword']['passwordsNotMatch'];
    }

    for (const error in this.errorMessages[controlName]) {
      if (control.hasError(error)) {
        return this.errorMessages[controlName][error];
      }
    }

    return '';
  }
}