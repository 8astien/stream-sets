import { Component, OnInit } from '@angular/core';
import Twitch from 'twitch.js';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  embedTwitch! : any;

  constructor() { }

  ngOnInit() :void {
        var options = {
            width: 500,
            height: 300,
            channel: "gotaga",
          };
       }

}
