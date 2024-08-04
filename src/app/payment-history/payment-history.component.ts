import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent {
  @ViewChildren('textToCopy') textToCopies!: QueryList<ElementRef<HTMLParagraphElement>>;
  copyIcons: string[] = ['/assets/icons/copy.svg', '/assets/icons/copy.svg']; 

  items = [
    { accountNumber: '6785 4987 6543',RecipientName:'Jonathon Smith',totalPrice:1000},
    { accountNumber: '1234 5678 9012',RecipientName:'Jonathon Smith',totalPrice:1000 }
  ];

  copyText(index: number): void {
    const element = this.textToCopies.toArray()[index].nativeElement;
    const range = document.createRange();
    range.selectNode(element);

    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);

    try {
      document.execCommand('copy');
      this.copyIcons[index] = '/assets/icons/check mark.svg'; 

      setTimeout(() => {
        this.copyIcons[index] = '/assets/icons/copy.svg'; 
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    window.getSelection()?.removeAllRanges();
  }
}
