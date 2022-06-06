import { NgModule } from '@angular/core';
import { InvalidControlScrollDirective } from 'src/app/directives/invalid-scroll-control-scroll/invalid-control-scroll.directive';
import { PasswordValidatorDirective } from 'src/app/directives/validators/password-validator.directive';

@NgModule({
  declarations: [InvalidControlScrollDirective, PasswordValidatorDirective],
  exports: [InvalidControlScrollDirective, PasswordValidatorDirective],
})
export class SharedModule {}
