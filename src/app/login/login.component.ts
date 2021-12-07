import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpclientService } from '../services/httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpclientService]
})
export class LoginComponent implements OnInit {

  public static userName:String = "";

  constructor(private httpclientservice: HttpclientService, private cookieService: CookieService, private router: Router) { }

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

  goHome() {
    this.router.navigate(['/home']);
  }

  postLogin() {

    this.dataLogin['username'] = this.getUsername();
    this.dataLogin['password'] = this.getPassword();

    console.log(this.dataLogin);

    this.httpclientservice.postLogin(this.dataLogin).subscribe((res: any) => {

      if (res["codeRetour"] === 0) {

        LoginComponent.userName = res["username"];
        this.cookieService.set("cookie-name", "true");
        window.alert(res["username"] + " , you are connected");
        this.goHome();
      } else {
        this.cookieService.set("cookie-name", "false");
        window.alert("Username or Password incorrect");
      }

    })
  }
}
