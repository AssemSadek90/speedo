import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/services/global.service';

@Component({
  selector: 'app-confirmation-comp',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-comp.component.html',
  styleUrl: './confirmation-comp.component.scss'
})
export class ConfirmationCompComponent {
  constructor(private globalService: GlobalService,private router: Router) { }
  handleConfirm() : void {
    this.globalService.setGlobalVariable("payment")
    this.router.navigate(["/transfer", "payment"])
  }
  handleBack() : void {
    this.globalService.setGlobalVariable("amount")
    this.router.navigate(["/transfer", "amount"])
  }
}
