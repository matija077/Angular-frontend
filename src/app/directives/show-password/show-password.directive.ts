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
  private isEmptySubsc$: Subscription;
  private isEmpty$ = new BehaviorSubject(true);

  @HostListener('click')
  onTogglePassword() {
    this.passwordInputType$.next(
      this.passwordInputType$.value === 'password' ? 'text' : 'password'
    );
  }

  private onInputChange(event: any) {
    const data = event.data;
    this.isEmpty$.next(data === '' || data == null);
  }

  constructor(private passwordShowToggle: ElementRef) {
    const parent: HTMLElement =
      this.passwordShowToggle.nativeElement.parentElement;
    this.passwordInput = parent.getElementsByTagName('input')[0];

    this.passwordInputTypeSubsc$ = this.passwordInputType$.subscribe((type) => {
      this.passwordInput.type = type;
    });

    this.passwordInput.addEventListener('input', this.onInputChange.bind(this));
    this.isEmptySubsc$ = this.isEmpty$.subscribe((isEmpty) => {
      const className = '--empty';
      const classList = this.passwordShowToggle.nativeElement.classList;
      isEmpty ? classList.add(className) : classList.remove(className);
    });
  }

  ngOnDestroy() {
    this.passwordInputTypeSubsc$.unsubscribe();
    this.isEmptySubsc$.unsubscribe();
  }
}
