import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css'],
  providers: [LoginComponent]
})
export class LoggedComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  username: string = "";
  selected = "";
  public gridList = ['test', 'gotage', 'Jeelllaplusbelle', 'MaghlaDegueulasse', 'SardLeBest', 'Adreitael'];


  ngOnInit(): void {

    console.log("Init logged C : " + this.loginService.getLocalStorage());
    console.log("userName Before : " + this.username);

    if (this.loginService.getLocalStorage() === "true") {
      this.username = this.loginService.getDataLocalStorage("username");
    } else {
      this.username = "Deconnected";
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  testFunc(event: any) {
    const value = event.target.value;
    this.selected = value;
    console.log(value);
  }

  disconnect() {
    this.loginService.DeleteLocalStorage();
    this.goHome();
  }

}
