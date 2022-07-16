import {
  AfterViewChecked,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from 'express';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { OrientationService } from './services/orientation-service/orientation.service';
import { ScrollingDirectionService } from './services/scrolling-direction/scrolling-direction.service';
import { ScrollingStates } from './types/consts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewChecked, OnInit {
  @ViewChild('test') testic: any;
  twoWayBind?: string;
  scrollDirection = ScrollingStates.REST;

  constructor(
    private authService: AuthServiceService,
    @Inject('isMobile') isMob: any,
    os: OrientationService,
    private scrollingDirection: ScrollingDirectionService
  ) {}
  twoWayBindChange() {}

  ngOnInit() {
    this.scrollingDirection.createScrollingDirective(100, {
      next: (direction) => this.setScrollDirection(direction),
    });
  }

  ngAfterViewChecked() {}

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  login() {
    this.authService.login();
  }

  setScrollDirection(direction: ScrollingStates) {
    this.scrollDirection = direction;
  }
}
