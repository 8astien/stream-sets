import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from '../services/httpclient.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpclientService]
})
export class LoginComponent implements OnInit {

  constructor(private httpclientservice: HttpclientService, private cookieService:CookieService) { }

  ngOnInit(): void {
  }

  LoginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  private dataLogin = {
    username: "",
    password: ""
  }

  getUsername() {
    return this.LoginForm.get('username')!.value;
  }

  getPassword() {
    return this.LoginForm.get('password')!.value;
  }

  postLogin() {

    this.dataLogin['username'] = this.getUsername();
    this.dataLogin['password'] = this.getPassword();

    console.log(this.dataLogin);
    
    this.httpclientservice.postLogin(this.dataLogin).subscribe((res: any) => {
      
      if(res["codeRetour"] === 0 ){

        console.log("Account exists : " + res["username"]);
        this.cookieService.set("cookie-name" , "true");

      }else{
        console.log("Account not exists : " + res["username"]);
        this.cookieService.set("cookie-name" , "false");
      }

    })
  }
}
