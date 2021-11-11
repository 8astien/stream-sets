import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { PlayersComponent } from './players/players.component';


const routes: Routes = [
  {path: '', redirectTo: '/menu' , pathMatch:"full"},
  {path: 'menu', component: TopMenuComponent},
  {path: 'players', component: PlayersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
