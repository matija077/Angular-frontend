import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../app.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string;

  constructor(private authService: AuthServiceService) {
    authService.subscribe((data) => {
      this.isLoggedIn = data;
    });
    this.userName = 'Ja';
  }

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
}
