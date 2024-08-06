import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyAcountGaurdService implements CanActivate{

  private token: string | null = "dummy-token";
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
   }
  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.token = sessionStorage.getItem('token');
      if (this.token) {
        return true;
      }

      this.router.navigate(['/error404']);
      return false;
    }
    return true;
  }
}
