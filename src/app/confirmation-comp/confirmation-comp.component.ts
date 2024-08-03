import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirmation-comp',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-comp.component.html',
  styleUrl: './confirmation-comp.component.scss'
})
export class ConfirmationCompComponent implements OnInit, OnDestroy {
  formData: any;
  queryParamsSubscription!: Subscription;
  constructor(private globalService: GlobalService,private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      this.formData = JSON.parse(params['data']);
      console.log('Form data:', this.formData);
    });
  }
  handleConfirm() : void {
    this.globalService.setTransferStatusVariable("payment")
    this.router.navigate(["/transfer", "payment"])
  }
  handleBack() : void {
    this.globalService.setTransferStatusVariable("amount")
    this.router.navigate(["/transfer", "amount"])
  }
  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
