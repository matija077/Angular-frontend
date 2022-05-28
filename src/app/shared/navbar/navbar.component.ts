import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../app.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string;
  private a = 3;

  constructor(private authService: AuthServiceService) {
    authService.subscribe(({ isLoggedIn }) => {
      this.isLoggedIn = isLoggedIn;
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
