import { NgModule } from '@angular/core';
import { InvalidControlScrollDirective } from 'src/app/directives/invalid-scroll-control-scroll/invalid-control-scroll.directive';

@NgModule({
  declarations: [InvalidControlScrollDirective],
  exports: [InvalidControlScrollDirective],
})
export class SharedModule {}
