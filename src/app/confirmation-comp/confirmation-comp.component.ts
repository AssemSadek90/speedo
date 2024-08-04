import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';
import { ProfileInfoService } from '../../shared/services/profile-info.service';
import { TransferMoneyService } from '../../shared/services/transfer-money.service';
import { NgIf } from '@angular/common';
import { DataOfForm } from '../../shared/services/models/dataOfForm';

@Component({
  selector: 'app-confirmation-comp',
  standalone: true,
  imports: [NgIf],
  templateUrl: './confirmation-comp.component.html',
  styleUrl: './confirmation-comp.component.scss'
})
export class ConfirmationCompComponent implements OnInit, OnDestroy {
  formData!: DataOfForm;
  transferMoneySubscription!: Subscription;
  status!: number;
  isFailureMessage: boolean = false;
  constructor(private globalService: GlobalService,private router: Router, private profileInfoService: ProfileInfoService, private transferMoney: TransferMoneyService) { }
  ngOnInit(): void {
    this.formData = this.globalService.getDataOfForm();
    
  }
  handleConfirm() : void {
    this.transferMoney.postTransferMoney(this.formData.amountToSend, this.formData.amountToRecieve,this.formData.currencyToSend , this.formData.currencyToRecieve, this.formData.fromName, this.formData.toName,this.formData.fromAccNum, this.formData.toAccNum, this.formData.fees, 200).subscribe((res: any) => {
      console.log(res);
      this.status = res.status;
      if (this.status === 200) {
        this.globalService.setTransferStatusVariable("payment")
      this.router.navigate(["/transfer", "payment"])
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
    if (this.transferMoneySubscription) {
      this.transferMoneySubscription.unsubscribe();
    }
  }
}
