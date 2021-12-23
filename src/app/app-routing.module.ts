import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { PlayersComponent } from './players/players.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedComponent } from './logged/logged.component';

const routes: Routes = [
  {path: '', redirectTo: '/home' , pathMatch:"full"},
  {path: 'home', component: PlayersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'logged', component: LoggedComponent},
  {path: 'players', component: PlayersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
