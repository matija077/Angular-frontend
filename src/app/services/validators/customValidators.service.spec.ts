import { HttpClient } from '@angular/common/http';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AsyncData, AsyncError } from '../auth-service/auth-service.service.spec';

import { CustomValidatorsService } from './customValidators.service';

@Component({
  template: `<form (ngSubmit)="submit($event)" [formGroup]="formGroup">
  <input type="email" formGroupName="email"/>
    <input type="password" id="password" />
    <input type="password" id="confirmPassword" />
    <button type="submit" >Submit</button>
  </form>`,
})
class TestCustomValidatorComponent {}


describe('ValidatorsService', () => {
  let service: CustomValidatorsService;
  let httpClientMock: jasmine.SpyObj<HttpClient>
  let component: TestCustomValidatorComponent;
  let fixture: ComponentFixture<TestCustomValidatorComponent>;
  let password: DebugElement;
  let confirmPassword: DebugElement;
  let email: DebugElement;
  let form: HTMLFormElement;
  let formGroup: FormGroup
  let changePassword: (value: string) => void;
  let changeConfirmPassword: (value: string) => void;
  let submit: (props: any) => void
  let isSubmitted = false
  const httpClientMockTemp = jasmine.createSpyObj('httpClient', ['get'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestCustomValidatorComponent,
      ],
      providers: [
        CustomValidatorsService,
        {provide: HttpClient, useValue: httpClientMockTemp}
      ]
    })
    fixture = TestBed.createComponent(TestCustomValidatorComponent);
    service = TestBed.inject(CustomValidatorsService);
    httpClientMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientMock.get.calls.reset()
    component = fixture.componentInstance;
    password = fixture.debugElement.query(By.css('#password'));
    confirmPassword = fixture.debugElement.query(By.css('#confirmPassword'));
    form = fixture.debugElement.nativeElement;
    formGroup = new FormGroup({
      email: new FormControl('', [], [service.EmailValidator])
    })
    submit = () => {
      isSubmitted = true;
    }

  })

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('email valdiation', fakeAsync(() => {
    debugger
    tick();
    const emailFormControl = formGroup.get('email')
    expect(emailFormControl?.invalid).toBe(false)
    expect(emailFormControl?.valid).toBe(false)

    const fakeReturnValue = {  };
    httpClientMock.get.and.returnValue(AsyncError(fakeReturnValue))
    tick();
    expect(emailFormControl?.invalid).toBe(true)
    expect(emailFormControl?.valid).toBe(false)

    emailFormControl?.patchValue({email: '23'})
    httpClientMock.get.and.returnValue(AsyncData(fakeReturnValue))
    tick();
    expect(emailFormControl?.invalid).toBe(false)
    expect(emailFormControl?.valid).toBe(true)
  }))
});
