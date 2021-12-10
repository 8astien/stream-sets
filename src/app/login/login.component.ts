import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpclientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpclientService]
})
export class LoginComponent implements OnInit {

  public static userName: string = "";
  public listSet = [];

  constructor(private httpclientservice: HttpclientService, private loginService: LoginService, private router: Router) { }

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

  goLogged() {
    this.router.navigate(['/logged']);
  }

  postLogin() {

    this.dataLogin['username'] = this.getUsername();
    this.dataLogin['password'] = this.getPassword();

    this.httpclientservice.postLogin(this.dataLogin).subscribe((res: any) => {

      if (res["codeRetour"] === 0) {

        this.loginService.storeOnLocalStorage();
        this.loginService.storeDataOnLocalStorage("username", res["username"]);
        window.alert(res["username"] + " , you are connected");
        this.goLogged();

      } else {
        window.alert("Username or Password incorrect");
      }

    })
  }
}
