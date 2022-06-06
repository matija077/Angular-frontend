import { NgModule } from '@angular/core';
import { InvalidControlScrollDirective } from 'src/app/directives/invalid-scroll-control-scroll/invalid-control-scroll.directive';
import { ShowPasswordDirective } from 'src/app/directives/show-password/show-password.directive';
import { PasswordValidatorDirective } from 'src/app/directives/validators/password-validator.directive';

@NgModule({
  declarations: [
    InvalidControlScrollDirective,
    PasswordValidatorDirective,
    ShowPasswordDirective,
  ],
  exports: [
    InvalidControlScrollDirective,
    PasswordValidatorDirective,
    ShowPasswordDirective,
  ],
})
export class SharedModule {}
