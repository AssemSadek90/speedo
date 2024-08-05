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

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) {
      return null;
    }
  
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const validLength = value.length >= 8;
  
    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSymbol && validLength;
  
    if (!isValid) {
      return {
        strongPassword: 'Password must be at least 8 characters long and include upper and lower case letters, numbers, and symbols.'
      };
    }
  
    return null;
  }
}
