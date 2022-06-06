import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { defer } from 'rxjs';
import { Roles } from 'src/app/types/consts';

import {
  AuthServiceService,
  IAuthServiceSubscribeCallback,
  ICallback,
} from './auth-service.service';

let service: AuthServiceService;
let httpClientMock: jasmine.SpyObj<HttpClient>;

export const AsyncData = <T>(data: T) => defer(() => Promise.resolve(data));
export const AsyncError = <T>(error: T) => defer(() => Promise.reject(error));

describe('AuthServiceService', () => {
  httpClientMock = jasmine.createSpyObj('httpClient', ['get', 'post']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthServiceService,
        //{ provide: AuthServiceService, useValue: serviceMock },
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    service = TestBed.inject(AuthServiceService);
    httpClientMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    httpClientMock.post.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('before login user to be logged out and role anonymus', () => {
    expect(service.isLoggedIn).toBe(false);
    expect(service.role).toBe(Roles.anonymus);
  });
  it('login', fakeAsync(() => {
    const fakeReturnValue = { isLoggedIn: true };
    httpClientMock.post.and.returnValue(AsyncData(fakeReturnValue));
    service.login();
    //flushMicrotasks();
    tick();
    expect(httpClientMock.post.calls.count())
      .withContext('expecting one call on login')
      .toBe(1);
    expect(service.isLoggedIn).withContext('logged in').toBe(true);
    expect(Roles[service.role]).withContext('role').toBe(Roles[Roles.admin]);
  }));

  it('logout', fakeAsync(() => {
    httpClientMock.post.and.returnValue(AsyncData({}));
    service.logout();
    tick();
    expect(httpClientMock.post.calls.count())
      .withContext('expecting one call on logout')
      .toBe(1);
    expect(service.isLoggedIn).withContext('logged out').toBe(false);
    expect(Roles[service.role]).withContext('role').toBe(Roles[Roles.anonymus]);
  }));

  it('susbcribe', fakeAsync(() => {
    let isLoggedIn = false;
    let role: Roles = Roles.anonymus;

    const cb: ICallback<IAuthServiceSubscribeCallback, void> = (data) => {
      isLoggedIn = data.isLoggedIn;
      role = data.role;
    };
    const cbSpy = jasmine.createSpy('t', cb);

    service.subscribe(cbSpy.and.callThrough());

    const fakeReturnValue = { isLoggedIn: true };
    httpClientMock.post.and.returnValue(AsyncData(fakeReturnValue));
    service.login();
    tick();

    expect(httpClientMock.post.calls.count())
      .withContext('called post')
      .toBe(1);
    expect(cbSpy.calls.any()).withContext('callback after login').toBe(true);
    expect(isLoggedIn).withContext('shouildbe logged in').toBe(true);
    expect(Roles[role])
      .withContext('shlould be admin')
      .toBe(Roles[Roles.admin]);

    service.logout();
    tick();
    expect(httpClientMock.post.calls.count())
      .withContext('called post second time')
      .toBe(2);
    expect(cbSpy.calls.any()).withContext('callback after logout').toBe(true);
    expect(isLoggedIn).withContext('shouildbe logged out').toBe(false);
    expect(Roles[role])
      .withContext('shlould be anonymus')
      .toBe(Roles[Roles.anonymus]);
  }));
});
