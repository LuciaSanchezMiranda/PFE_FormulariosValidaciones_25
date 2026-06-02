import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validación personalizada: el teléfono debe tener exactamente 9 dígitos numéricos.
 */
export function telefonoNueveDígitosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor: string = control.value ?? '';
    const soloDigitos = /^\d{9}$/.test(valor);
    return soloDigitos ? null : { telefonoInvalido: true };
  };
}

/**
 * Validación personalizada: la fecha de ingreso no puede ser anterior a hoy.
 */
export function fechaNoAnteriorHoyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const fechaIngresada = new Date(control.value);
    const hoy = new Date();
    // Comparar solo fechas (sin hora)
    hoy.setHours(0, 0, 0, 0);
    fechaIngresada.setHours(0, 0, 0, 0);

    return fechaIngresada >= hoy ? null : { fechaAnterior: true };
  };
}

/**
 * Validación personalizada: el salario debe ser mayor a 0.
 */
export function salarioPositivoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = parseFloat(control.value);
    return valor > 0 ? null : { salarioInvalido: true };
  };
}
