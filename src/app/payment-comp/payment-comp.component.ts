import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../shared/services/favourite.service';
import { DataOfForm } from '../../shared/services/models/dataOfForm';

@Component({
  selector: 'app-payment-comp',
  standalone: true,
  imports: [],
  templateUrl: './payment-comp.component.html',
  styleUrl: './payment-comp.component.scss'
})
export class PaymentCompComponent implements OnInit, OnDestroy {

  formData!: DataOfForm;
  favouriteSubscription!: Subscription;
  status!: number;
  constructor(private router: Router, private globalService: GlobalService, private favouriteService: FavouriteService) {}
  ngOnInit(): void {
    this.formData = this.globalService.getDataOfForm();
  }
  handleBackToHome() {
    this.globalService.setTransferStatusVariable("amount")
    this.router.navigate(["/transfer", "amount"]);
  }
  handleAddToFavourite() {
    this.favouriteSubscription = this.favouriteService.postFavoriteRequest(this.formData.toName, this.formData.toAccNum, 200).subscribe((res :any) => {
      this.status = res.status;
      console.log(res);
    })
  }

  ngOnDestroy(): void {
    
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
  }
}
