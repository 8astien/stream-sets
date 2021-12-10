import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpclientService } from '../services/httpclient.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  providers: [HttpclientService]
})
export class TopMenuComponent implements OnInit {

  isConnected = false;

  constructor(private httpclientservice: HttpclientService, private loginService:LoginService) { }

  ngOnInit(): void {
    let test:String = this.loginService.getLocalStorage();
    
    if(test === "true" ){  
    this.isConnected = true;

    } else {
      this.isConnected = false;
    }
  }

  @ViewChild('btnGen', { static: false }) btnGen: ElementRef | undefined;

  isShown: boolean = false;

  private dataSet = {
    nameSet: "",
    descSet: "",
    username: ""
  }

  DataForm = new FormGroup({
    nameSet: new FormControl(),
    descSet: new FormControl()
  })

  getNameSet() {
    return this.DataForm.get('nameSet')!.value;
  }

  getDescSet() {
    return this.DataForm.get('descSet')!.value;
  }

  showForm() {
    if (this.isShown === false) {
      this.isShown = true;
    } else {
      this.isShown = false;
    }
  };

  postDataSet() {

    this.dataSet['nameSet'] = this.getNameSet();
    this.dataSet['descSet'] = this.getDescSet();
    this.dataSet['username'] = this.loginService.getDataLocalStorage("username");

    console.log(this.dataSet);

    this.httpclientservice.postCreateSet(this.dataSet).subscribe((res: any) => {
      console.log("Bienvenue : " + res["username"]);
      window.location.reload();

    })
  }
}