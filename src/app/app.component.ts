import { AfterViewChecked, Component, Inject, ViewChild } from '@angular/core';
import { Router } from 'express';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { OrientationService } from './services/orientation-service/orientation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  @ViewChild('test') testic: any;
   twoWayBind?: string;

  constructor(private authService: AuthServiceService, @Inject('isMobile') isMob: any, os: OrientationService) {
    console.log(isMob)
  }
  twoWayBindChange() {

  }

  ngAfterViewChecked() {

  }

  get isLoggedIn(){
    return this.authService.isLoggedIn
  }

  login() {
    this.authService.login()
  }

}
