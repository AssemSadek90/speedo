import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../shared/services/favourite.service';
import { DataOfForm } from '../../shared/services/models/dataOfForm';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-payment-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './payment-comp.component.html',
  styleUrl: './payment-comp.component.scss'
})
export class PaymentCompComponent implements OnInit, OnDestroy {

  formData!: DataOfForm;
  favouriteSubscription!: Subscription;
  status!: number;
  isHiddenMessage: boolean = true;
  favouriteMessage: string = "";
  constructor(private router: Router, private globalService: GlobalService, private favouriteService: FavouriteService) {}
  ngOnInit(): void {
    this.formData = this.globalService.getDataOfForm();
  }
  handleBackToHome() {
    this.globalService.setTransferStatusVariable("amount")
    this.router.navigate(["/"]);
  }
  handleAddToFavourite() {
    this.favouriteSubscription = this.favouriteService.postFavoriteRequest(this.formData.toName, this.formData.toAccNum).subscribe({next: (res :any) => {
      this.isHiddenMessage = false;
      this.favouriteMessage = "added to favorites"
    }, error: (err :any) => {
      console.log(err);
      this.isHiddenMessage = false;
      this.favouriteMessage = err.error.detail;
    }})
  }

  ngOnDestroy(): void {
    
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
  }
}
