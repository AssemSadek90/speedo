import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  greaterThanZeroValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return value > 0 ? null : { greaterThanZero: true };
    };
  }
  twelveDigitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && !/^\d{12}$/.test(value)) {
        return { 'twelveDigit': { value: control.value } };
      }
      return null;
    };
  }
  digitsOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^\d*$/.test(control.value); 
      return isValid ? null : { 'digitsOnly': { value: control.value } };
    };
  }
  minDigitsValidator(minDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; 
      }
      
      const value = control.value.toString();
      const digitCount = value.replace(/\D/g, '').length;
  
      return digitCount >= minDigits ? null : { minDigits: { value: control.value } };
    };
  }
}
