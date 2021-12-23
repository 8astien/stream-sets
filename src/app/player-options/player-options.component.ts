import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-player-options',
  templateUrl: './player-options.component.html',
  styleUrls: ['./player-options.component.css']
})
export class PlayerOptionsComponent implements OnInit {

  constructor() { }

  @Input() /*static*/ chatDisplay: boolean = false;
  @Output() sendStatus: EventEmitter<any> = new EventEmitter<any>();
  public isChecked: boolean = false;

  ngOnInit(): void {
  }

  toggleChat() {

    this.isChecked = !this.isChecked;
    console.log("isChecked : " + this.isChecked);
    this.chatDisplay = this.isChecked;
    //window.location.reload();
  }

  sendChatStatus(){
    this.sendStatus.emit(this.chatDisplay);
  }


}
