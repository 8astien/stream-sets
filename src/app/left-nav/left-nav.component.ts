import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }
  printPlayers() {
    let streamList = ["Gotaga", "aminematue", "JeeTV", "zacknani", "Inoxtag"];
    streamList.forEach(function (value) {
      console.log(value);
    });
  }

}
