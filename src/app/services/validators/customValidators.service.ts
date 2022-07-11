import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors as ValidationErrorsFromAngular,
  ValidatorFn,
} from '@angular/forms';
import { catchError, Observable, of, take } from 'rxjs';

type AsyncValidatorReturnType =
  | Promise<ValidatorsReturnType>
  | Observable<ValidatorsReturnType>;
import ValidationErrors, {
  ValidationErrorsReturnType,
} from 'src/app/shared/Errors/ValidationErrors';

type ValidatorsReturnType = ValidationErrorsFromAngular | null;

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(public http: HttpClient) {}

  UserNameValidator(input: string): ValidatorFn {
    return function validator(
      control: AbstractControl
    ): ValidationErrorsFromAngular | null {
      if ((control.value as string).includes('0')) {
        return { error: true };
      }
      return null;
    };
  }

  UserNameValidator2(control: AbstractControl) {
    const p = new Promise((res, rej) => {
      return true;
    });
  }

  ZipCodeValidator(country: string) {
    const wasBlurredBefore = false;

    return function (control: AbstractControl): ValidatorsReturnType {
      if (control.pristine) {
        return null;
      }

      const map: Record<string, { length: number; firstChars: string }> = {
        hr: {
          length: 5,
          firstChars: '51',
        },
      };

      let countryRules = map[country];
      if (!countryRules) {
        countryRules = map['hr'];
      }
      const inputValue = String(control.value);

      let isError = false;
      const errors: {
        length?: string;
        firstChars?: string;
      } = {};

      const checkLengthError = () => {
        if (countryRules.length !== inputValue.length) {
          errors.length = 'wrong length';
          isError = true;
        }
      };
      const checkFirstCharsError = () => {
        if (!inputValue.startsWith(countryRules.firstChars)) {
          errors.firstChars = 'wrong first chars';
          isError = true;
        }
      };

      checkFirstCharsError();
      checkLengthError();

      if (isError) {
        return errors;
      }

      return null;
    };
  }

  Password(control: AbstractControl): ValidationErrorsReturnType {
    if (control.value.password === control.value.confirmPassword) {
      return null;
    }

    return ValidationErrors.createValidationError({
      type: ValidationErrors.ValidationErrors.PasswordsNotMatching,
    });
  }

  Form(type: AbstractControl): ValidatorsReturnType {
    return null;
  }

  EmailValidator(control: AbstractControl): AsyncValidatorReturnType {
    debugger;
    if (!this.http) {
      return Promise.reject();
    }
    if (!control.value) {
      return Promise.resolve({ err: 'empty' });
    }
    return this.http.get('http://localhost:8080/api/validate/email?email=' + control.value).pipe(
      take(1),
      catchError((err) =>
        of({
          err
        })
      )
    );
  }
}
