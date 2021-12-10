import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE , StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(): void {
    this.storage.set("isLogged", "true");
  }

  public DeleteLocalStorage() {
    this.storage.clear();
  }

  public getLocalStorage() {
   return this.storage.get("isLogged");
  }

  public storeDataOnLocalStorage(key:string , value:string): void {
    this.storage.set(key, value);
  }

  public getDataLocalStorage(key:string) {
    return this.storage.get(key);
   }

}
