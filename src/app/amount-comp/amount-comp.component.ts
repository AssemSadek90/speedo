import { NgIf } from '@angular/common';
import { Component, HostListener, } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-amount-comp',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './amount-comp.component.html',
  styleUrl: './amount-comp.component.scss'
})
export class AmountCompComponent {
  currentFrom: string = 'USD';
  urlImgFrom: string = "assets/flags/united states.svg";
  urlImgTo: string = "assets/flags/egypt.svg";
  currentTo: string = 'EGP';
  isFormListHidden: boolean = true;
  isToListHidden: boolean = true;
  isModalHidden: boolean = true;
  transferFrom: FormGroup = new FormGroup({
    send: new FormControl('', [Validators.required]),
    get: new FormControl('', [Validators.required]),
    recipientName: new FormControl('', [Validators.required]),
    recipientAccount: new FormControl('', [Validators.required, Validators.email]),
  })
  constructor(private globalService: GlobalService, private router: Router) {}
  handleClickFrom(): void {
    this.isFormListHidden =!this.isFormListHidden;
  }
  handleSelectFrom(current: string): void {
    this.currentFrom = current;
    this.isFormListHidden = true;
  }
  handleClickTo(): void {
    this.isToListHidden =!this.isToListHidden;
  }
  handleSelectTo(current: string): void {
    this.currentTo = current;
    this.isToListHidden = true;
  }
  // handleContinue() {
  //   this.globalService.setGlobalVariable("confirmation");
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
  onSubmit(): void {
    this.globalService.setGlobalVariable("confirmation");
    this.router.navigate(["/transfer", "confirmation"])
    console.log("Submit button clicked");
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
