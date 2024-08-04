import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { FavouriteService } from '../../shared/services/favourite.service';

@Component({
  selector: 'app-payment-comp',
  standalone: true,
  imports: [],
  templateUrl: './payment-comp.component.html',
  styleUrl: './payment-comp.component.scss'
})
export class PaymentCompComponent implements OnInit, OnDestroy {
  queryParamsSubscription!: Subscription;
  amountToRecieve!: number;
  currencyToRecieve!: string;
  fromName!: string;
  toName!: string;
  fromAccNum!: number;
  toAccNum!: number;
  fees!: number;
  currencyToSend!:string;
  favouriteSubscription!: Subscription;
  status!: number;
  constructor(private router: Router, private globalService: GlobalService, private route: ActivatedRoute, private favouriteService: FavouriteService) {}
  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.amountToRecieve = Number(params['amountToRecieve']);
      this.currencyToRecieve = params['currencyToRecieve'];
      this.currencyToSend = params['currencyToSend'];
      this.fromName = params['fromName'];
      this.toName = params['toName'];
      this.fromAccNum = Number(params['fromAccNum']);
      this.toAccNum = Number(params['toAccNum']);
      this.fees = Number(params['fees']);
    });
  }
  handleBackToHome() {
    this.globalService.setTransferStatusVariable("amount")
    this.router.navigate(["/transfer", "amount"]);
  }
  handleAddToFavourite() {
    this.favouriteSubscription = this.favouriteService.postFavoriteRequest(this.toName, this.toAccNum, 200).subscribe((res :any) => {
      this.status = res.status;
      console.log(res);
    })
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.favouriteSubscription) {
      this.favouriteSubscription.unsubscribe();
    }
  }
}
