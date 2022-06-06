import { HttpClient } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { AsyncData } from 'src/app/services/auth-service/auth-service.service.spec';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceMock: jasmine.SpyObj<AuthServiceService>;
  let httpClientMock: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthServiceService', [
      'login',
      'logout',
      'isLoggedIn',
      'silentLogin',
      'role',
      'subscribe',
    ]);
    //authServiceMock.subscribe = authServiceMock.subscribe.and.callThrough();
    httpClientMock = jasmine.createSpyObj('httpClient', ['get', 'post']);

    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        {
          provide: authServiceMock,
          useValue: authServiceMock,
        },
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    authServiceMock.login.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should habe userName', () => {
    expect(component.userName).toBe('Ja');
  });
  it('should log in', fakeAsync(() => {
    httpClientMock.post.and.returnValue(AsyncData({}));

    const loginButton: HTMLSpanElement =
      fixture.debugElement.nativeElement.querySelector('[data-id="loginButton"]');
    loginButton.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();

    expect(component.isLoggedIn).withContext('is logged in').toBe(true);
    /*expect(authServiceMock.login.calls.any())
      .withContext('auth login')
      .toBe(true);*/



    const loginDiv: HTMLElement = fixture.debugElement.nativeElement.querySelector('[data-id="Login"]')
    expect(loginDiv).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('[data-id="Logout"]') as HTMLElement).toBeTruthy()

    const logoutButton = loginDiv.querySelector(":scope :nth-child(2)") as HTMLElement
    logoutButton.dispatchEvent(new Event('click'))
    tick();
    fixture.detectChanges();

    expect(component.isLoggedIn).toBe(false)
    expect(loginDiv.querySelector('[data-id="Login"]') as HTMLElement).toBeFalsy()
    expect(fixture.debugElement.nativeElement.querySelector('[data-id="Logout"]') as HTMLElement).toBeFalsy()





  }));
});
