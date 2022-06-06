import { Directive, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Directive({
  selector: '[appShowPassword]',
})
export class ShowPasswordDirective implements OnDestroy {
  private passwordInputType$ = new BehaviorSubject<'password' | 'text'>(
    'password'
  );
  private passwordInput: HTMLInputElement;
  private passwordInputTypeSubsc$: Subscription;

  @HostListener('click')
  onTogglePassword() {
    this.passwordInputType$.next(
      this.passwordInputType$.value === 'password' ? 'text' : 'password'
    );
  }

  constructor(private passwordShowToggle: ElementRef) {
    const parent: HTMLElement =
      this.passwordShowToggle.nativeElement.parentElement;
    this.passwordInput = parent.getElementsByTagName('input')[0];

    this.passwordInputTypeSubsc$ = this.passwordInputType$.subscribe((type) => {
      this.passwordInput.type = type;
    });
  }

  ngOnDestroy() {
    this.passwordInputTypeSubsc$.unsubscribe();
  }
}
