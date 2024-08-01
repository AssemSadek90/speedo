import { Component } from '@angular/core';
import { AmountCompComponent } from "../amount-comp/amount-comp.component";
import { ConfirmationCompComponent } from "../confirmation-comp/confirmation-comp.component";
import { PaymentCompComponent } from "../payment-comp/payment-comp.component";
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-transfer-comp',
  standalone: true,
  imports: [AmountCompComponent, ConfirmationCompComponent, PaymentCompComponent, NgClass, NgIf],
  templateUrl: './transfer-comp.component.html',
  styleUrl: './transfer-comp.component.scss'
})
export class TransferCompComponent {
  status: string = "amount";
  changeStatusToConfirmation(): void { 
    this.status = "confirmation";
  }
}
