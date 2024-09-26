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
