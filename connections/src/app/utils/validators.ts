import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validateName(
  control: AbstractControl
): null | ValidationErrors {
  const { value } = control;
  return /[\p{L}\s]+/gmu.test(value)
    ? null
    : { invalidName: { message: 'Name could be any of letters or spaces' } };
}

export function validatePasswordStrong(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  if (
    !/(?=.*[0-9])(?=.*[!@#?])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#?]{8,}/g.test(
      value
    )
  ) {
    return {
      passwordStrong: {
        message: "Your password isn't strong enough. Password must be contain:",
      },
    };
  }
  return null;
}

export function validatePasswordLength(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  return value.length >= 8
    ? null
    : { passwordLength: { message: 'at least 8 characters' } };
}

export function validatePasswordLettersCase(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  return /(?=.*[a-z])(?=.*[A-Z])/g.test(value)
    ? null
    : {
        passwordLettersCase: {
          message: 'minimum 1 capital letter',
        },
      };
}

export function validatePasswordDigits(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  return /(?=.*[0-9])/g.test(value)
    ? null
    : { passwordDigits: { message: 'minimum 1 digit' } };
}

export function validatePasswordSpecialChars(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  return /(?=.*[!@#?$*_-])/g.test(value)
    ? null
    : {
        passwordSpecialChars: {
          message: 'inclusion of at least one special character, e.g., ! @ # ?',
        },
      };
}

export function validateEnteredEmail(emails: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value } = control;
    return emails.includes(value)
      ? { enteredEmail: { message: 'This email was entered early' } }
      : null;
  };
}

export function validateGroupName(
  control: AbstractControl
): ValidationErrors | null {
  const { value } = control;
  return /[\p{L}\s\d]+/gmu.test(value)
    ? null
    : {
        invalidGroupName: {
          message: 'Name could be any of letters, digits or spaces',
        },
      };
}
