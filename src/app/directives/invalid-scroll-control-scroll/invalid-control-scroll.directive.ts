import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInvalidControlScroll]',
})
export class InvalidControlScrollDirective {
  constructor(private form: ElementRef) {}

  @HostListener('ngSubmit')
  onSubmit() {
    this.scrollToFirstError();
  }

  scrollToFirstError() {
    const invalidInputs =
      this.form?.nativeElement.getElementsByClassName('ng-invalid') ?? [];
    const firstInvalidInput = invalidInputs[0];
    if (!firstInvalidInput) {
      return;
    }

    const scrollElementToTop = (element: Element) => {
      const { top } = element.getBoundingClientRect();

      window.scrollTo({
        top: document.documentElement.scrollTop + top,
        behavior: 'smooth',
      });
    };

    const focusElement = (element: Element, preventScroll = false) => {
      (element as any).focus({ preventScroll });
    };

    scrollElementToTop(firstInvalidInput);
    focusElement(firstInvalidInput, true);
  }
}
