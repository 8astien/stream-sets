import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HttpclientService } from '../services/httpclient.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css'],
  providers: [LoginComponent]
})
export class LoggedComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private httpclientservice: HttpclientService) { }

  username: string = "";
  selected = "";
  public setList: string[] = [];
  public setDesc: string[] = [];

  dataSets = {
    "username": ""
  }

  deleteSets = {
    "nameSet": "",
    "userId": ""
  }

  editSets = {
    "nameSet": "",
    "descSet": "",
    "setId": ""
    //"userId": ""
  }

  ngOnInit(): void {

    if (this.loginService.getLocalStorage() === "true") {
      this.username = this.loginService.getDataLocalStorage("username");
      this.postGetSets();
    } else {
      this.username = "Deconnected";
    }
  }

  initGridList() {

    this.setList = this.loginService.getDataLocalStorage("listName");
    this.setDesc = this.loginService.getDataLocalStorage("listStream");

  }

  postGetSets() {

    this.dataSets['username'] = this.loginService.getDataLocalStorage("username");
    let listSetName: any = [];
    let listSetDesc: any = [];

    this.httpclientservice.postSets(this.dataSets).subscribe((response: any) => {
      this.loginService.storeDataOnLocalStorage("id_User", response["id_User"]);

      for (let index = 0; index < response["listSets"].length; index++) {
        listSetName.push(response["listSets"][index]["setName"]);
        listSetDesc.push(response["listSets"][index]["setDesc"]);
      }

      this.loginService.storeDataOnLocalStorage("listName", listSetName);
      this.loginService.storeDataOnLocalStorage("listStream", response["listSets"]);

      this.initGridList();
    })
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  changeValue(event: any) {
    const value = event.target.value;
    this.selected = value;

    let listTemp = this.loginService.getDataLocalStorage("listStream");

    (<HTMLInputElement>document.getElementById("setName")).value = value;

    listTemp.forEach((element: { [x: string]: any; }) => {

      if (element["setName"] === value) {
        document.getElementById("setsArea")!.innerHTML = element["setDesc"];
        this.editSets["setId"] = element["idSet"];
      }

    });
    
  }

  editSet() {


    let nameSet = (<HTMLInputElement>document.getElementById("setName")).value;
    let descSet = (<HTMLInputElement>document.getElementById("setsArea")).value;

    this.editSets['nameSet'] = nameSet;
    this.editSets['descSet'] = descSet;
    
    this.httpclientservice.postEdit(this.editSets).subscribe((response: any) => {

      //TODO POP UP EDIT SET
      window.location.reload();

    })
  }

  deleteSet() {


    let nameSet = (<HTMLInputElement>document.getElementById("setName")).value;

    this.deleteSets['nameSet'] = nameSet;
    this.deleteSets['userId'] = this.loginService.getDataLocalStorage("id_User");

    this.httpclientservice.postDelete(this.deleteSets).subscribe((response: any) => {

      //TODO POP UP DELETE SET
      window.location.reload();

    })

  }


  disconnect() {
    this.loginService.DeleteLocalStorage();
    this.goHome();
  }

}
