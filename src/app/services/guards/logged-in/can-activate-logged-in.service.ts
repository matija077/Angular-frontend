import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServiceService } from '../../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateLoggedInService implements CanActivate {
  constructor(private authService: AuthServiceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    return false;
  }
}
