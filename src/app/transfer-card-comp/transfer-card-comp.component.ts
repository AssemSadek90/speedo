import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../currency-service.service';

@Component({
  selector: 'transfer-card-comp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-card-comp.component.html',
  styleUrls: ['./transfer-card-comp.component.scss']
})
export class TransferCardCompComponent implements OnInit {
  exchangeRate: number | null = null;
  fromCurrency = 'USD';
  toCurrency = 'EGP';
  amountToSend = 0;
  amountToReceive = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.updateRecipientAmount();
  }

  onAmountToSendChange(): void {
    this.amountToReceive = this.amountToSend * this.exchangeRate!;
  }
  onRecipientAmountChange(): void {
    this.amountToSend = this.amountToReceive / this.exchangeRate!;
  }

  updateRecipientAmount(): void {
    this.currencyService.getExchangeRate(this.fromCurrency).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.toCurrency];
        if (rate) {
          this.exchangeRate = rate;
          this.amountToReceive = this.amountToSend * rate;
        } else {
          this.amountToReceive = 0;
        }
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
      },
      complete: () => {
        // console.info('Exchange rate fetching complete');
      }
    });
  }
}
