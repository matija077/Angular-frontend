import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, take } from 'rxjs';

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
    console.log('saljem')
    debugger
    if (!this.http) {
      return Promise.reject()
    }
   return this.http.get('/api/validate/email').pipe(take(1))
    //const res = await this.http.get('/api/validate/email')
   // console.log(res)
    //if (control.value === '') {
      /*return new Observable((sub) => {
        sub.next({ email: 'error' });
        sub.complete();
      });*/

      //return Promise.resolve({error: 'empty'})
    //}

    /*return new Observable((sub) => {
      sub.next(null);
      sub.complete();
    });*/

    //return Promise.resolve(null)


  }
}
