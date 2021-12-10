import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';
import { HttpclientService } from '../services/httpclient.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {


  public setList: string[] = [];
  public streamList: string[] = [];

  constructor(private httpclientservice: HttpclientService, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginService.getLocalStorage() === "true") {
      this.postGetSets();
    }
  }

  dataSets = {
    "username": ""
  }

  postGetSets() {

    this.dataSets['username'] = this.loginService.getDataLocalStorage("username");
    let listSetName: string[] = [];

    this.httpclientservice.postSets(this.dataSets).subscribe((response: any) => {

      for (let index = 0; index < response["listSets"].length; index++) {
        listSetName.push(response["listSets"][index]["setName"]);
      }

      this.loginService.storeDataOnLocalStorage("listStream", response["listSets"]);

      this.setList = listSetName;
      console.log(listSetName);

    })
  }

  initList(set: any, value: any): any {

    console.log("Init : " + set);

    let result: any[] = [];

    let words = set.split(',');


    for (let index = 0; index < words.length; index++) {
      result.push(words[index]);
    }

    console.log("result : " + result[0]);

    return result;
  }

  createPlayers(value: any) {

    this.deletePlayers("player");
    let streamList: any[] = [];
    let list = this.loginService.getDataLocalStorage("listStream");
    let temp: string[] = [];
    console.log(list);

    list.forEach((set: { [x: string]: any; }) => {
      let nameSet = set["setName"];
      if (nameSet === value) {
        temp = set["setDesc"];
      }
    });

    streamList = this.initList(temp, value);

    streamList.forEach(function (value) {
      let playerFrame = document.createElement("div");
      playerFrame.id = value;
      playerFrame.className = "player";
      document.getElementById("players")!.appendChild(playerFrame);
      const embed = new TwitchEmbed(value, {
        width: 1200 / 2,
        height: 720 / 2,
        channel: value,
        muted: true,
        layout: TwitchEmbedLayout.VIDEO
      });
    });
  }

  deletePlayers(className: any) {

    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
  }

  printPlayers(value: any): void {

    this.router.navigate(['/home']);

    setTimeout(() => { this.createPlayers(value) }, 1);
  
  }
}

