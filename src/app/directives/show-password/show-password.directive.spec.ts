import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowPasswordDirective } from './show-password.directive';

@Component({
  template: `<div>
    <input type="password" /><span appShowPassword>Click</span>
  </div>`,
})
class TestShowPasswordComponent {}

describe('ShowPasswordDirective', () => {
  let component: TestShowPasswordComponent;
  let fixture: ComponentFixture<TestShowPasswordComponent>;
  let inputEl: DebugElement;
  let button: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestShowPasswordComponent, ShowPasswordDirective],
    });
    fixture = TestBed.createComponent(TestShowPasswordComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
    button = fixture.debugElement.query(By.directive(ShowPasswordDirective));
  });
  it('password input type should be password', () => {
    expect(inputEl.nativeElement.type).toBe('password');
  });

  it('password input type should be text', () => {
    button.triggerEventHandler('click', null);
    expect(inputEl.nativeElement.type).toBe('text');
  });

  it('password input should be text', () => {
    button.triggerEventHandler('click', null);
    inputEl.nativeElement.value = '33';
    expect(inputEl.nativeElement.value).toBe('33');
  });

  it('password integration', () => {
    inputEl.nativeElement.value = '33';
    expect(inputEl.nativeElement.value).toBe('33');

    button.triggerEventHandler('click', null);
    expect(inputEl.nativeElement.type).toBe('text');
    expect(inputEl.nativeElement.value).toBe('33');

    button.triggerEventHandler('click', null);
    expect(inputEl.nativeElement.type).toBe('password');
    expect(inputEl.nativeElement.value).toBe('33');
  });
});
