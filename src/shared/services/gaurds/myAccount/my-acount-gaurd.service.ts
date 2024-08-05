import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyAcountGaurdService {

  private token: string | null = null;
  constructor(private router: Router,  @Inject(DOCUMENT) document: Document) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {
      this.token = sessionStorage.getItem("token");
  }
   }
  canActivate(): boolean {
    if (this.token) {
      return true;
    } else {
      this.router.navigate(['/error404']);
      return false;
    }
  }
}
