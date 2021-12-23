import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.css']
})
export class PlayerOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selected = "";
}
