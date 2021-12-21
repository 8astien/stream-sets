import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpclientService } from '../services/httpclient.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private httpclientservice: HttpclientService , private router:Router ) { }

  ngOnInit(): void {
  }

  SignForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    password_confirmation: new FormControl()
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
  getPasswordConfirm() {
    return this.SignForm.get('password_confirmation')!.value;
  }
  checkPassword() {
    if (this.getPassword() === this.getPasswordConfirm()) {
      return true;
      // POP UP CREATED ACCOUNT SUCCESSFULLY
    } else {
      return false;
      // POP UP PASSWORDS ARENT MATCHING
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  postSignUp() {

    if (this.checkPassword()===true ) {  
    this.dataSignUp['username'] = this.getUsername();
    this.dataSignUp['password'] = this.getPassword();

    console.log(this.dataSignUp);

    this.httpclientservice.postSignUp(this.dataSignUp).subscribe((res: any) => {

      if(res["codeRetour"] === 0 ){
        window.alert("Compte Created : " + res["username"]); 
        this.goHome();
      }else{
        window.alert("Error username already taken");
      }
      
    })}
  }


}
