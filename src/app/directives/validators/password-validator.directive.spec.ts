import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PasswordValidatorDirective } from './password-validator.directive';
@Component({
  template: `<form ngForm appPasswordValidator>
    <input type="password" name="password" id="password" [(ngModel)]="password" />
    <input type="password" name="confirmPassword" id="confirmPassword" [(ngModel)]="confirmPassword"/>
    <button type="submit" >Submit</button>
  </form>`,
})
class TestPasswordValidatorComponent {}

describe('PasswordValidatorDirective', () => {
  let component: TestPasswordValidatorComponent;
  let fixture: ComponentFixture<TestPasswordValidatorComponent>;
  let password: DebugElement;
  let confirmPassword: DebugElement;
  let form: HTMLFormElement;
  let changePassword: (value: string) => void;
  let changeConfirmPassword: (value: string) => void;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        TestPasswordValidatorComponent,
        PasswordValidatorDirective,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestPasswordValidatorComponent);
    component = fixture.componentInstance;
    password = fixture.debugElement.query(By.css('#password'));
    confirmPassword = fixture.debugElement.query(By.css('#confirmPassword'));
    form = fixture.debugElement.nativeElement;

    changePassword = changeInputValue.bind(this, password)
    changeConfirmPassword = changeInputValue.bind(this, confirmPassword)
  }));

  const changeInputValue = (element: DebugElement, value: string) => {
    element.nativeElement.value = value;
    element.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };

  it('should create an component with a directive', fakeAsync(() => {
    fixture.autoDetectChanges(true)
    tick();
    expect(component).toBeTruthy();
    expect(form.classList.contains("ng-pristine")).toBe(true)
  }));

  it('passwords should match', fakeAsync(() => {
    fixture.autoDetectChanges(true)
    tick();
    console.log(form.classList)

    expect(form.classList).toBe("")
    expect(form.classList.contains('ng-valid')).toBe(true);

    changePassword('1')
    changeConfirmPassword('1')
    expect(form.classList.contains('ng-valid')).toBe(true);

    changePassword('')
    changeConfirmPassword('')
    expect(form.classList.contains('ng-valid')).toBe(true);
  }));

  it('passwords should not match', () => {
    expect(form.classList.contains('ng-invalid')).toBe(true);

    changePassword('1')
    changeConfirmPassword('2')
    expect(form.classList.contains('ng-invalid')).toBe(true);

    changePassword('')
    expect(form.classList.contains('ng-invalid')).toBe(true);
    expect(form.classList.contains('ng-valid')).not.toBe(true);
  });
});
