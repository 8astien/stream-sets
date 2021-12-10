import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { PlayersComponent } from './players/players.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { SignupComponent } from './signup/signup.component';
import { LoggedComponent } from './logged/logged.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    PlayersComponent,
    LoginComponent,
    LeftNavComponent,
    SignupComponent,
    LoggedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
