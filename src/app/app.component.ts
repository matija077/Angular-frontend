import { Component } from '@angular/core';
import { Router } from 'express';
import { AuthServiceService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authService: AuthServiceService) {}

  get isLoggedIn(){
    return this.authService.isLoggedIn
  }

  login() {
    this.authService.login()
  }

}
