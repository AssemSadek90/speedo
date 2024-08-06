import { Injectable } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentGaurdService {

  constructor(private globalService: GlobalService, private router: Router) { }
  canActivate(): boolean {
    if (this.globalService.getTransferStatusVariable() === "payment") {
      return true;
    } else {
      this.router.navigate(["/transfer", "amount"])
      return false;
    }
  }
}
