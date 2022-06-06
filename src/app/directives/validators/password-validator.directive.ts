import { Attribute, Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useClass: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  constructor(@Attribute('appPasswordValidator') public PasswordControl: any) {}

  @Input() appPasswordValidatorInput: any;

  validate(control: AbstractControl) {
    return null;
  }
}
