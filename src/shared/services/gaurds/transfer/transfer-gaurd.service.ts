import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { RegisterModalService } from '../../register-modal.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferGaurdService {

  private token: string | null = null;
  constructor(private router: Router,  @Inject(DOCUMENT) document: Document, private registerModalService: RegisterModalService ) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {
      this.token = sessionStorage.getItem("token");
  }
   }
  canActivate(): boolean {
    if (this.token) {
      return true;
    } else {
      this.router.navigate(['']);
      this.registerModalService.openRegisterModal();
      return false;
    }
  }
}
