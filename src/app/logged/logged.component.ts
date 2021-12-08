import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css'],
  providers:[LoginComponent]
})
export class LoggedComponent implements OnInit {

  constructor(private cookieService: CookieService , private router:Router , private login:LoginComponent) { }


  username:String = LoginComponent.userName;
  selected = "";

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/home']);
  }
  testFunc(event:any) {
    const value = event.target.value;
    this.selected = value;
    console.log(value);  
  }

  disconnect() {
    this.cookieService.set("cookie-name" , "false");
    this.goHome();
  }

}
