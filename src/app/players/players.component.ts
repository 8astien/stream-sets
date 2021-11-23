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
   
    const embed = new TwitchEmbed('sardoche', {
      width: 1200/2,
      height: 720/2,
      channel: 'sardoche',
      layout: TwitchEmbedLayout.VIDEO
    });
    const embed2 = new TwitchEmbed('kameto', {
      width: 1200/2,
      height: 720/2,
      channel: 'kamet0',
      layout: TwitchEmbedLayout.VIDEO
    });
  }
  // printPlayers() {
  //   let streamList = ["Gotaga", "aminematue", "JeeTV", "zacknani", "Inoxtag"];
  //   streamList.forEach(function (value) {
  //     console.log(value);
  //   });
  // }

}
