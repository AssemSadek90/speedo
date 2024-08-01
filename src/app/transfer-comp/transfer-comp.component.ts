import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AmountCompComponent } from "../amount-comp/amount-comp.component";
import { ConfirmationCompComponent } from "../confirmation-comp/confirmation-comp.component";
import { PaymentCompComponent } from "../payment-comp/payment-comp.component";
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { GlobalService } from '../../shared/services/global.service';
import { AppComponent } from "../app.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transfer-comp',
  standalone: true,
  imports: [AmountCompComponent, ConfirmationCompComponent, PaymentCompComponent, NgClass, NgIf, CommonModule, AppComponent, RouterOutlet],
  templateUrl: './transfer-comp.component.html',
  styleUrl: './transfer-comp.component.scss'
})
export class TransferCompComponent  {
  constructor(public globaService: GlobalService) {}
  
}
