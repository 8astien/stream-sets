import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
  }


  disconnect() {

    this.cookieService.set("cookie-name" , "false");


  }

}
