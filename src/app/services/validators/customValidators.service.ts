import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { catchError, Observable, of, take } from 'rxjs';

type ValidatorsReturnType = ValidationErrors | null;
type AsyncValidatorReturnType =
  | Promise<ValidatorsReturnType>
  | Observable<ValidatorsReturnType>;

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor(public http: HttpClient) {}

  UserNameValidator(input: string): ValidatorFn {
    return function validator(
      control: AbstractControl
    ): ValidationErrors | null {
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
