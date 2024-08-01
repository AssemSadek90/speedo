import { Component, OnDestroy, OnInit } from '@angular/core';
import { AmountCompComponent } from "../amount-comp/amount-comp.component";
import { ConfirmationCompComponent } from "../confirmation-comp/confirmation-comp.component";
import { PaymentCompComponent } from "../payment-comp/payment-comp.component";
import { NgClass, NgIf } from '@angular/common';
import { SharedService } from '../../shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transfer-comp',
  standalone: true,
  imports: [AmountCompComponent, ConfirmationCompComponent, PaymentCompComponent, NgClass, NgIf],
  templateUrl: './transfer-comp.component.html',
  styleUrl: './transfer-comp.component.scss'
})
export class TransferCompComponent implements OnInit, OnDestroy {
  status!: string;
  private sharedSubscription!: Subscription;
  constructor(private sharedService: SharedService) {}
  ngOnInit() {
    this.sharedSubscription = this.sharedService.currentAttribute.subscribe((attribute) => {
      this.status = attribute;
    });
  }
  ngOnDestroy(): void {
    if (this.sharedService) {
      this.sharedSubscription.unsubscribe();
    }
  }
}
