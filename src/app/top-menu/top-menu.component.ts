import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpclientService } from '../services/httpclient.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
  providers: [HttpclientService]
})
export class TopMenuComponent implements OnInit {

  isConnected = false;

  constructor(private httpclientservice: HttpclientService, private el: ElementRef,
    private renderer: Renderer2, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    if (this.cookieService.get("cookie-name") === "true") {
      this.isConnected = true;

    } else if (this.cookieService.get("cookie-name") === "false") {
      this.isConnected = false;
    }
  }

  @ViewChild('btnGen', { static: false }) btnGen: ElementRef | undefined;

  isShown: boolean = false;

  private dataSet = {
    nameSet: "",
    descSet: ""
  }

  DataForm = new FormGroup({
    nameSet: new FormControl(),
    descSet: new FormControl()
  })

  setsList = ["set1", "set2", "set3", "set4"];

  getNameSet() {
    return this.DataForm.get('nameSet')!.value;
  }

  getDescSet() {
    return this.DataForm.get('descSet')!.value;
  }

  showForm() {
    this.isShown = true;
  };

  postDataSet() {

    this.dataSet['nameSet'] = this.getNameSet();
    this.dataSet['descSet'] = this.getDescSet();

    console.log(this.dataSet);

    this.httpclientservice.postCreateSet(this.dataSet).subscribe((res: any) => {
      console.log("Bienvenue : " + res["username"]);
    })
  }
  hasRoute(route: string) {
    return this.router.url.includes(route);
  }

}
  // OLD FUNCTIONS
  // private btnExist: boolean = false;

  // private editEnable = false;
  // checkExist() {

  //   if (this.btnExist === false) {
  //     this.createSetButtons();
  //     this.btnExist = true;
  //   } else {
  //     this.deleteSetButtons();
  //     this.btnExist = false;
  //   }
  // }

  // deleteSetButtons() {
  //   let createBtn = document.getElementById('createSet')!;
  //   let editBtn = document.getElementById('editSet')!;
  //   let parent = this.renderer.parentNode(createBtn);
  //   parent.removeChild(createBtn);
  //   parent.removeChild(editBtn);
  //   this.isShown = false;
  // }

  // createSetButtons() {
  //   const buttonCreate = this.renderer.createElement('button');
  //   const textCreate = this.renderer.createText('Create Set');
  //   const buttonEdit = this.renderer.createElement('button');
  //   const textEdit = this.renderer.createText('Edit Set');
  //   this.renderer.setAttribute(buttonCreate, "id", "createSet");
  //   this.renderer.setAttribute(buttonEdit, "id", "editSet");
  //   this.renderer.appendChild(buttonCreate, textCreate);
  //   this.renderer.appendChild(buttonEdit, textEdit);
  //   this.renderer.listen(buttonCreate, 'click', this.showForm.bind(this));
  //   this.renderer.listen(buttonEdit, 'click', this.editLogo.bind(this));
  //   this.renderer.appendChild(this.btnGen!.nativeElement, buttonCreate);
  //   this.renderer.appendChild(this.btnGen!.nativeElement, buttonEdit);
  // }
  // editLogo() {

  //   if (this.editEnable === false) {
  //     let setList = document.getElementsByClassName("editable");
  //     Array.from(setList).forEach(function (element) {
  //       let createEdit = document.createElement("a");
  //       let createDelete = document.createElement("a");
  //       createEdit.className = "far fa-edit";
  //       createDelete.className = "fas fa-ban";
  //       element.appendChild(createEdit);
  //       element.appendChild(createDelete);
  //     });
  //   }
  //   this.editEnable = true;
  // }