import { Component, OnInit } from '@angular/core';
import { TwitchEmbed, TwitchEmbedLayout, TwitchEmbedOptions } from 'twitch-player';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { PlayerOptionsComponent } from '../player-options/player-options.component';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css'],
  providers: [PlayerOptionsComponent]
})
export class LeftNavComponent implements OnInit {

  public setList: string[] = [];
  public streamList: string[] = [];
  public test : any;
  public chatDisplay: boolean = false;
  public isChecked: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router, private playerOption: PlayerOptionsComponent) { }

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

  deletePlayers(className: any) {

    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
  }

  createPlayers(value: any, chat: any, resizeWidth: any, resizeHeight: any) {

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
        width: 1200 / resizeWidth,
        height: 720 / resizeHeight,
        channel: value,
        muted: true,
        layout: chat
      });
    });
  }

  printPlayers(value: any): void {

    this.router.navigate(['/home']);
    let enableChat = TwitchEmbedLayout.VIDEO;

    if (this.isChecked) {
      enableChat = TwitchEmbedLayout.VIDEO_WITH_CHAT;
      setTimeout(() => { this.createPlayers(value, enableChat, 1, 1.5) }, 1);

    } else {
      enableChat = TwitchEmbedLayout.VIDEO;
      setTimeout(() => { this.createPlayers(value, enableChat, 2, 2) }, 1);
    }

    this.test = value;
  }

  toggleChat() {
    this.isChecked = !this.isChecked;
    console.log("isChecked : " + this.isChecked);
  }

  displayChat() {
    this.printPlayers(this.test);
  }

}


