import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Roles } from 'src/app/types/consts';

interface ICallback<P, T> {
  (props: P): T;
}

interface IAuthServiceSubscribeCallback {
  isLoggedIn: boolean;
  role: Roles;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService implements OnDestroy {
  private url = 'http://127.0.0.1:8080/api/';
  private headers = new HttpHeaders();
  private isLoggedIn$ = new BehaviorSubject(false);
  private role$ = new BehaviorSubject(Roles.anonymus);

  constructor(private http: HttpClient) {
    this.silentLogin();
  }

  ngOnDestroy() {
    this.isLoggedIn$.unsubscribe();
    this.role$.unsubscribe();
  }

  login() {
    const body = {};
    this.http
      .post(`${this.url}login`, body, { headers: this.headers })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.isLoggedIn$.next(!!data);
          this.role$.next(Roles.admin);
        },
        error: (err) => console.error(err),
      });
  }
  silentLogin() {
    //this.login()
  }
  register() {}
  logout() {
    this.isLoggedIn$.next(false);
    this.role$.next(Roles.anonymus);

    const body = {};
    this.http
      .post(`${this.url}logout`, body, { headers: this.headers })
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => console.error(err),
      });
  }

  get isLoggedIn() {
    return this.isLoggedIn$.getValue();
  }
  get role() {
    return this.role$.getValue();
  }
  subscribe(cb: ICallback<IAuthServiceSubscribeCallback, void>) {
    /*this.isLoggedIn$.subscribe({
      next: (isLoggedIn) => cb(isLoggedIn),
    });*/

    return combineLatest([this.isLoggedIn$, this.role$]).subscribe(
      ([isLoggedIn, role]) => {
        cb({ isLoggedIn, role });
      }
    );
  }
}
