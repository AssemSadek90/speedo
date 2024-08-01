import { NgIf } from '@angular/common';
import { Component, } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-amount-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './amount-comp.component.html',
  styleUrl: './amount-comp.component.scss'
})
export class AmountCompComponent {
  currentFrom: string = 'USD';
  urlImgFrom: string = "../../assets/united-states.png";
  urlImgTo: string = "../../assets/egypt.png";
  currentTo: string = 'EGP';
  isFormListHidden: boolean = true;
  isToListHidden: boolean = true;
  constructor(private sharedService: SharedService) {}
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
  handleFavourite(event: Event): void {
    event.preventDefault();
    console.log("Favourite button clicked");
  }
  handleContinue() {
    this.sharedService.changeAttribute('confirmation');
    console.log("Continue button clicked");
  }
}
