import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { ScrollingStates } from 'src/app/types/consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', '../../app.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userName: string;

  @Input() public scrollDirection: ScrollingStates;

  constructor(private authService: AuthServiceService) {
    authService.subscribe(({ isLoggedIn }) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.userName = 'Ja';
    this.scrollDirection = ScrollingStates.REST;
  }

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }
  logout() {
    this.authService.logout();
  }
  getToolbarClassName() {
    const map: Record<ScrollingStates, string> = {
      [ScrollingStates.REST]: '',
      [ScrollingStates.DOWN]: 'toolbar--scrollingDown',
      [ScrollingStates.UP]: 'toolbar--scrollingUp',
    };
    return `toolbar ${map[this.scrollDirection]}`;
  }
}
