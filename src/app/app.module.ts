import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerModule } from './player/player.module';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ResizeService } from './services/resize-observer/resize.service';
@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PlayerModule],
  providers: [
    { provide: APP_INITIALIZER, useFactory: preLoad, multi: true },
    { provide: APP_INITIALIZER, useFactory: preLoad, multi: true },
    { provide: 'ResizeObserver', useClass: ResizeService },
    {
      provide: 'isMobile',
      useFactory: isMobile,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

function preLoad() {
  function t() {
    let resolve: (value: unknown) => void;
    window.setTimeout(() => resolve(1), 1000);

    return new Promise((res, rej) => (resolve = res));
  }

  return t;
}

function isMobile(t: any) {
  const p = document.documentElement;
  const width = Math.max(p.offsetWidth, p.scrollWidth, p.clientWidth);
  const height = Math.max(p.offsetHeight, p.scrollHeight, p.clientHeight);

  const orientation = width >= height ? 'landscape' : 'portrait';
  const isMobile = width < 600;

  return {
    orientation,
    isMobile,
  };
}
