import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Roles } from 'src/app/types/consts';
import { AuthServiceService } from '../../auth-service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateRoleService implements CanActivate {
  constructor(private authService: AuthServiceService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole: number = (next.data as any).expectedRole;

    if (this.authService.role >= expectedRole) {
      return true;
    }

    console.warn(
      `expected at least role  ${Roles[expectedRole]}, got ${
        Roles[this.authService.role]
      }`
    );
    return false;
  }
}
