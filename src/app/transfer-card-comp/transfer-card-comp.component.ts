import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../currency-service.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'transfer-card-comp',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './transfer-card-comp.component.html',
  styleUrls: ['./transfer-card-comp.component.scss'],
  providers: [DecimalPipe]
})
export class TransferCardCompComponent implements OnInit {
  exchangeRate: number | null = null;
  fromCurrency = 'USD';
  toCurrency = 'EGP';
  amountToSend = 0;
  amountToReceive = 0;

  constructor(private currencyService: CurrencyService, private decimalPipe: DecimalPipe) {}

  ngOnInit(): void {
    this.updateRecipientAmount();
  }

  onAmountToSendChange(): void {
    this.amountToReceive = Number(parseFloat(this.decimalPipe.transform(this.amountToSend * this.exchangeRate!, '1.2-3')!.replace(/,/g, '')));
  }
  onRecipientAmountChange(): void {
    this.amountToSend = Number(parseFloat(this.decimalPipe.transform(this.amountToReceive / this.exchangeRate!, '1.2-3')!.replace(/,/g, '')));

  }

  updateRecipientAmount(): void {
    this.currencyService.getExchangeRate(this.fromCurrency).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.toCurrency];
        if (rate) {
          this.exchangeRate = rate;
          this.onAmountToSendChange();
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
