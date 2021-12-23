import { Component, OnInit } from '@angular/core';
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

  constructor(private httpclientservice: HttpclientService, private loginService: LoginService) { }

  ngOnInit(): void {
    if (this.loginService.getLocalStorage() === "true") {
      this.setList = this.loginService.getDataLocalStorage("listName");

    }
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

  printPlayers(value: any): void {

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

    streamList = this.initList(temp , value);

    console.log("StreamList :" + streamList);

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
}
