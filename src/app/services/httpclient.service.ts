import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
 
  constructor(private httpClient: HttpClient) { }

  private urlCreateSet = "//localhost:8080/CreateSet";
  private urlLogin = "//localhost:8080/Login";
  private urlSignUp = "//localhost:8080/Sign";
  private urlGetSets = "//localhost:8080/GetSets";

  public postCreateSet(objet: any) {

    return this.httpClient.post(this.urlCreateSet, objet);
  }

  public postLogin(objet: any) {

    return this.httpClient.post(this.urlLogin, objet);
  }

  public postSignUp(objet: any) {

    return this.httpClient.post(this.urlSignUp, objet);
  }

  public postSets(objet: any) {

    return this.httpClient.post(this.urlGetSets, objet);
  }

}
