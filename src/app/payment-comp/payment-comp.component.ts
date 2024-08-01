import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-payment-comp',
  standalone: true,
  imports: [],
  templateUrl: './payment-comp.component.html',
  styleUrl: './payment-comp.component.scss'
})
export class PaymentCompComponent {
  constructor(private router: Router, private globalService: GlobalService) {}
  handleBackToHome() {
    this.globalService.setGlobalVariable("amount")
    this.router.navigate(["/transfer", "amount"]);
  }
}
