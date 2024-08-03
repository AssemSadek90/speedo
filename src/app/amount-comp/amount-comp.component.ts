import { NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit, } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CurrencyService } from '../currency-service.service';
import { Subscription } from 'rxjs';

export function greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value > 0 ? null : { greaterThanZero: true };
  };
}
@Component({
  selector: 'app-amount-comp',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './amount-comp.component.html',
  styleUrl: './amount-comp.component.scss',

})
export class AmountCompComponent implements OnDestroy, OnInit{
  currentFrom: string = 'USD';
  urlImgFrom: string = "assets/flags/united states.svg";
  urlImgTo: string = "assets/flags/egypt.svg";
  currentTo: string = 'EGP';
  isFormListHidden: boolean = true;
  isToListHidden: boolean = true;
  isModalHidden: boolean = true;
  exchangeRate!: number;
  USDEqualToEGP!: number;
  currencySubscribtion1!: Subscription;
  currencySubscribtion2!: Subscription;
  currencySubscribtion3!: Subscription;
  transferSubscription1!: Subscription | undefined;
  transferSubscription2!: Subscription | undefined;


  transferFrom: FormGroup = new FormGroup({
    send: new FormControl(0, [ greaterThanZeroValidator()]),
    get: new FormControl(0, [ greaterThanZeroValidator()]),
    recipientName: new FormControl('', [Validators.required]),
    recipientAccount: new FormControl('', [Validators.required, Validators.email]),
  })
  constructor(private globalService: GlobalService, private router: Router, private currencyService: CurrencyService) {
    
  }
  ngOnInit(): void {
    this.currencySubscribtion1 = this.currencyService.getExchangeRate(this.currentFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currentTo];
        if (rate) {
          console.log("i'm in")
          this.exchangeRate = rate;
          this.USDEqualToEGP = rate;
        }
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
      }
    });
    this.transferSubscription1 = this.transferFrom.get("send")?.valueChanges.subscribe(data => {
      if (!isNaN(Number(data))) {
        this.transferFrom.get("get")?.setValue(data * this.exchangeRate, {emitEvent: false});
      }
      
    })
    this.transferSubscription2 = this.transferFrom.get("get")?.valueChanges.subscribe(data => {
      if (!isNaN(Number(data))) {
        this.transferFrom.get("send")?.setValue(data / this.exchangeRate, {emitEvent: false});
      }
      
    })
  }
  handleClickFrom(): void {
    this.isFormListHidden =!this.isFormListHidden;
  }
  handleSelectFrom(current: string): void {
    this.currentFrom = current;
    this.isFormListHidden = true;
    this.currencySubscribtion2 = this.currencyService.getExchangeRate(this.currentFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currentTo];
        if (rate) {
          this.exchangeRate = rate;
        }
        console.log(this.exchangeRate);
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
      }
    });
    this.transferFrom.get("get")?.patchValue(0);
    this.transferFrom.get("send")?.patchValue(0);

  }
  handleClickTo(): void {
    this.isToListHidden =!this.isToListHidden;
  }
  handleSelectTo(current: string): void {
    this.currentTo = current;
    this.isToListHidden = true;
    this.currencySubscribtion3 = this.currencyService.getExchangeRate(this.currentFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currentTo];
        if (rate) {
          this.exchangeRate = rate;
        }
        console.log(this.exchangeRate);
      },
      error: (err) => {
        console.error('Error fetching exchange rate:', err);
      }
    });
    this.transferFrom.get("get")?.patchValue(0);
    this.transferFrom.get("send")?.patchValue(0);
  }
  // handleContinue() {
  //   this.globalService.setTransferStatusVariable("confirmation");
  //   this.router.navigate(["/transfer", "confirmation"])
  //   console.log("Continue button clicked");
  // }
  handleCloseModal(): void { 
    this.isModalHidden = true
     
   }
   handleItemListFavurite(name: string, account: string): void {
    this.transferFrom.get("recipientName")?.patchValue(name);
    this.transferFrom.get("recipientAccount")?.patchValue(account);
    this.isModalHidden = true;
   }
  onSubmit(form: FormGroup): void {
    if (form.invalid) return;
    this.globalService.setTransferStatusVariable("confirmation");
    this.router.navigate(["/transfer", "confirmation"], { queryParams: { data: JSON.stringify(form.value) } });
    console.log("Submit button clicked");
   }
  ngOnDestroy(): void {
      if (this.currencySubscribtion1) {
        this.currencySubscribtion1.unsubscribe();
      }
      if (this.currencySubscribtion2) {
        this.currencySubscribtion1.unsubscribe();
      }
      if (this.currencySubscribtion3) {
        this.currencySubscribtion1.unsubscribe();
      }
      if (this.transferSubscription1) {  
        this.transferSubscription1.unsubscribe();
      }
      if (this.transferSubscription2) {
        this.transferSubscription2.unsubscribe(); 
      }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.from-current-list')) {
      this.isFormListHidden = true;
    }
    if (!target.closest('.to-current-list')) {
      this.isToListHidden = true;
    }
    if ( (!target.closest('.favorite-modal') && this.isModalHidden === false)|| target.closest(".favorite-button")) {
      this.isModalHidden = !this.isModalHidden;
    }
  }


}
