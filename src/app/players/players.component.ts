import { Component, OnInit } from '@angular/core';
import { TwitchEmbed, TwitchEmbedLayout } from 'twitch-player';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  constructor() { }

  ngOnInit() :void {
   
  }
  printPlayers() {
    let streamList = ["gotaga", "aminematue", "jeeltv", "zacknani", "inoxtag"];
    streamList.forEach(function (value) {
      let playerFrame = document.createElement("div");
      playerFrame.id = value;
      playerFrame.className = "player";
      document.getElementById("players")!.appendChild(playerFrame);
      const embed = new TwitchEmbed(value, {
        width: 1200/2,
        height: 720/2,
        channel: value,
        layout: TwitchEmbedLayout.VIDEO
      });
    });
  }
}
