import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './player/register/register.component';

// TODO add authguard and make register inside children
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'player/register', component: RegisterComponent, children: [] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
