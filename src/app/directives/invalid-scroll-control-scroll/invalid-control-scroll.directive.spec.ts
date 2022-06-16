import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InvalidControlScrollDirective } from './invalid-control-scroll.directive';

@Component({
  template: `<form appInvalidControlScroll>
  <br /> <br />
    <label for="name">name</label>
    <input id="name" type="text" name="name" />
    <label for="id">Password</label>
    <input id="password" type="password" name="password" />
    <input type="submit" />
  </form>`,
})
class TestInvalidScrollComponent {}

describe('InvalidControlScrollDirective', () => {
  let component: TestInvalidScrollComponent;
  let fixture: ComponentFixture<TestInvalidScrollComponent>;
  let inputName: DebugElement;
  let inputPassword: DebugElement;
  let button: DebugElement;
  let invalidControlScrollDirective: DebugElement;
  const toggleValidity = (el: DebugElement) =>
    el.nativeElement.classList.toggle('ng-invalid');
  let toggleNameValidity: any;
  let togglePasswordValidity: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestInvalidScrollComponent, InvalidControlScrollDirective],
    });
    fixture = TestBed.createComponent(TestInvalidScrollComponent);
    component = fixture.componentInstance;
    inputName = fixture.debugElement.query(By.css('#name'));
    inputPassword = fixture.debugElement.query(By.css('#password'));
    button = fixture.debugElement.query(By.css('[type="submit"]'));
    invalidControlScrollDirective = fixture.debugElement.query(
      By.directive(InvalidControlScrollDirective)
    );

    toggleNameValidity = toggleValidity.bind(this, inputName);
    togglePasswordValidity = toggleValidity.bind(this, inputPassword);
  });
  it('should create an instance', () => {
    expect(invalidControlScrollDirective).toBeTruthy();
    expect(document.documentElement.scrollTop).toBe(0);
  });

  it('should not scroll if form is valid', fakeAsync(() => {
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(document.documentElement.scrollTop).toBe(0);
  }));

  it('should scroll if form is invalid', fakeAsync(() => {
    togglePasswordValidity();
    let wasScrolled = false;
    document.documentElement.addEventListener('scroll', () => {
      wasScrolled = true
    }, {capture: true})
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    tick()
    expect(wasScrolled).toBe(true)
  }));
});
