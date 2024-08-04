import { DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, Inject, OnDestroy, OnInit, } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CurrencyService } from '../currency-service.service';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../shared/services/favourite.service';

export function greaterThanZeroValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return value > 0 ? null : { greaterThanZero: true };
  };
}
export function twelveDigitValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && !/^\d{12}$/.test(value)) {
      return { 'twelveDigit': { value: control.value } };
    }
    return null;
  };
}
export function digitsOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValid = /^\d*$/.test(control.value); 
    return isValid ? null : { 'digitsOnly': { value: control.value } };
  };
}
@Component({
  selector: 'app-amount-comp',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './amount-comp.component.html',
  styleUrl: './amount-comp.component.scss',

})
export class AmountCompComponent implements OnDestroy, OnInit{
  currencyFrom: string = 'USD';
  urlImgFrom: string = "assets/flags/united-states.png";
  urlImgTo: string = "assets/flags/egypt.png";
  currencyTo: string = 'EGP';
  isFormListHidden: boolean = true;
  isToListHidden: boolean = true;
  isModalHidden: boolean = true;
  isSubmitted: boolean = false;
  exchangeRate!: number;
  USDEqualToEGP!: number;
  currencySubscribtion1!: Subscription;
  currencySubscribtion2!: Subscription;
  currencySubscribtion3!: Subscription;
  transferSubscription1!: Subscription | undefined;
  transferSubscription2!: Subscription | undefined;
  token!: string;
  listFavourites!: any[];
  listFavouritesSubscription!: Subscription 


  transferFrom: FormGroup = new FormGroup({
    send: new FormControl(0, [Validators.required, greaterThanZeroValidator()]),
    get: new FormControl(0, [Validators.required, greaterThanZeroValidator()]),
    recipientName: new FormControl('', [Validators.required]),
    recipientAccount: new FormControl('', [Validators.required, digitsOnlyValidator()]),
  })
  constructor(private globalService: GlobalService, private router: Router, private currencyService: CurrencyService, @Inject(DOCUMENT) private document: Document, private favouriteService: FavouriteService) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {
      sessionStorage.setItem("accessToken", "HelloWorld");
  }
  }
  ngOnInit(): void {
    this.currencySubscribtion1 = this.currencyService.getExchangeRate(this.currencyFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currencyTo];
        if (rate) {
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
    this.favouriteService.getFavouritesRequest().subscribe(res  => {
      this.listFavourites = res;
    })
  }
  handleClickFrom(): void {
    this.isFormListHidden =!this.isFormListHidden;
  }
  handleSelectFrom(currency: string, imgFlag: string): void {
    this.currencyFrom = currency;
    this.urlImgFrom = imgFlag;
    this.isFormListHidden = true;
    this.currencySubscribtion2 = this.currencyService.getExchangeRate(this.currencyFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currencyTo];
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
  handleSelectTo(currency: string, imgFlag: string): void {
    this.currencyTo = currency;
    this.urlImgTo = imgFlag;
    this.isToListHidden = true;
    this.currencySubscribtion3 = this.currencyService.getExchangeRate(this.currencyFrom).subscribe({
      next: (data) => {
        const rate = data.conversion_rates[this.currencyTo];
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
    if (form.invalid) {
      this.isSubmitted = true;
      return;
    };
    this.isSubmitted = false;
    this.globalService.setTransferStatusVariable("confirmation");
    this.router.navigate(["/transfer", "confirmation"], { queryParams: { data: JSON.stringify(form.value), currencyFrom: this.currencyFrom, currencyTo: this.currencyTo } });
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
      if (this.listFavouritesSubscription) {
        this.listFavouritesSubscription.unsubscribe()
      }
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.from-currency-list')) {
      this.isFormListHidden = true;
    }
    if (!target.closest('.to-currency-list')) {
      this.isToListHidden = true;
    }
    if ( (!target.closest('.favorite-modal') && this.isModalHidden === false)|| target.closest(".favorite-button")) {
      this.isModalHidden = !this.isModalHidden;
    }
  }


}
