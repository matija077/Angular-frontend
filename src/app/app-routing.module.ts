import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './player/profile/profile.component';
import { RegisterComponent } from './player/register/register.component';
import { CanActivateLoggedInService } from './services/guards/logged-in/can-activate-logged-in.service';
import { CanActivateRoleService } from './services/guards/role/can-activate-role.service';
import { Roles } from './types/consts';

// TODO add authguard and make register inside children
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'player/register', component: RegisterComponent, children: [] },
  {
    path: 'player/profile',
    component: ProfileComponent,
    children: [],
    canActivate: [CanActivateLoggedInService, CanActivateRoleService],
    data: { expectedRole: Roles.user },
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
