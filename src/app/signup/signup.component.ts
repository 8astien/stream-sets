import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpclientService } from '../services/httpclient.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpclientservice: HttpclientService) { }

  ngOnInit(): void {
  }

  SignForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  private dataSignUp = {
    username: "",
    password: ""
  }

  getUsername() {
    return this.SignForm.get('username')!.value;
  }

  getPassword() {
    return this.SignForm.get('password')!.value;
  }

  postSignUp() {

    this.dataSignUp['username'] = this.getUsername();
    this.dataSignUp['password'] = this.getPassword();

    console.log(this.dataSignUp);

    this.httpclientservice.postSignUp(this.dataSignUp).subscribe((res: any) => {
      console.log("Bienvenue : " + res["username"]);
    })
  }


}
