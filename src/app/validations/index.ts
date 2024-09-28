import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function skillsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const skillsArray = control.value;

    // Verifica que sea un arreglo y tenga al menos un elemento
    if (!Array.isArray(skillsArray) || skillsArray.length === 0) {
      return { required: true };
    } else {
      return null;
    }
  };
}

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    selectedDate.setDate(selectedDate.getDate() + 1);
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Si la fecha seleccionada es anterior o igual a la fecha actual, retorna un error
    return selectedDate > currentDate ? null : { notFutureDate: true };
  };
}
