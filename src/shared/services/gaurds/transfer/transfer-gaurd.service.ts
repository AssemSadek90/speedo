import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { RegisterModalService } from '../../register-modal.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransferGaurdService implements CanActivate{

  private token: string | null = "dummy-token";
  constructor(private router: Router, private registerModalService: RegisterModalService, @Inject(PLATFORM_ID) private platformId: Object ) {

   }
  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('token');
      console.log(this.token)
      if (this.token) {
        return true;
      }

      this.router.navigate(['/']);
      this.registerModalService.openRegisterModal();
      return false;
    }
    return true;
  }
}
