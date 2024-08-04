import { Component, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { PaymentHistoryService } from '../../shared/services/payment-history.service';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  @ViewChildren('textToCopy') textToCopies!: QueryList<ElementRef<HTMLParagraphElement>>;
  @ViewChildren('imgToCopy') imgToCopies!: QueryList<ElementRef<HTMLImageElement>>;

  listHistory!: any[];

  constructor(private paymentHistoryService: PaymentHistoryService){}
  ngOnInit(): void {
      this.paymentHistoryService.getPaymentHistory().subscribe(res => {
        this.listHistory = res;
      })
  }

  copyText(index: number): void {
    const element = this.textToCopies.toArray()[index].nativeElement;
    const elementImg = this.imgToCopies.toArray()[index].nativeElement;
    const range = document.createRange();

    range.selectNode(element);

    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      document.execCommand('copy');
      elementImg.src = '/assets/icons/check mark.svg'; 

      setTimeout(() => {
        elementImg.src = '/assets/icons/copy.svg'; 
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    window.getSelection()?.removeAllRanges();
  }
}
