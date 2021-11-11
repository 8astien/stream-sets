import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {

  constructor(private httpClient: HttpClient) { }

  private urlCreateSet = "//localhost:8080/dataSet";

  public postCreateSet(objet: any) {

    let data_header = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post(this.urlCreateSet, objet);
  }

}
