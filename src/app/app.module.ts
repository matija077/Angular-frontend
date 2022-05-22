import { APP_INITIALIZER, Inject, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { HomeComponent } from './components/home/home.component';
import { AuthServiceService } from './services/auth-service.service';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PlayerModule],
  providers: [{ provide: APP_INITIALIZER, useFactory: preLoad, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}

function preLoad() {
  return function () {
    let resolve: (value: unknown) => void;
    window.setTimeout(() => resolve(1), 5000);

    return new Promise((res, rej) => (resolve = res));
  };
}
