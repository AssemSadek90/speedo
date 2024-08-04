import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { ProfileInfoService } from '../../shared/services/profile-info.service';
import { TransferMoneyService } from '../../shared/services/transfer-money.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-confirmation-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirmation-comp.component.html',
  styleUrl: './confirmation-comp.component.scss'
})
export class ConfirmationCompComponent implements OnInit, OnDestroy {
  formData: any;
  queryParamsSubscription!: Subscription;
  profileInfoSubscription!: Subscription;
  transferMoneySubscription!: Subscription;
  profileInfo: any;
  fees!: number;
  currencyFrom!: string;
  currencyTo!: string;
  status!: number;
  isFailureMessage: boolean = false;
  constructor(private globalService: GlobalService,private router: Router, private route: ActivatedRoute, private profileInfoService: ProfileInfoService, private transferMoney: TransferMoneyService) { }
  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.formData = JSON.parse(params['data']);
      this.currencyFrom = params['currencyFrom'];
      this.currencyTo = params['currencyTo'];
      this.fees = Number(this.formData.send) * 0.01897;
    });
    this.profileInfoSubscription = this.profileInfoService.getProfileInfo().subscribe(res => {
      this.profileInfo = res;
    });
  }
  handleConfirm() : void {
    this.transferMoney.postTransferMoney(Number(this.formData.send), Number(this.formData.get), this.currencyFrom, this.currencyTo, this.profileInfo.firstName + " " + this.profileInfo.lastName, this.formData.recipientName,this.profileInfo.account, this.formData.recipientAccount, this.fees, 200).subscribe((res: any) => {
      console.log(res);
      this.status = res.status;
      if (this.status === 200) {
        this.globalService.setTransferStatusVariable("payment")
      this.router.navigate(["/transfer", "payment"], { queryParams: { amountToRecieve: this.formData.get,currencyToSend: this.currencyFrom, currencyToRecieve: this.currencyTo, fromName: this.profileInfo.firstName + " " + this.profileInfo.lastName, toName: this.formData.recipientName, fromAccNum: this.profileInfo.account, toAccNum: this.formData.recipientAccount, fees: this.fees } })
      } else {
        this.isFailureMessage = true
      }
    })

    
  }
  handleBack() : void {
    this.globalService.setTransferStatusVariable("amount")
    this.router.navigate(["/transfer", "amount"])
  }
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    if (this.profileInfoSubscription) {
      this.profileInfoSubscription.unsubscribe();
    }
    if (this.transferMoneySubscription) {
      this.transferMoneySubscription.unsubscribe();
    }
  }
}
