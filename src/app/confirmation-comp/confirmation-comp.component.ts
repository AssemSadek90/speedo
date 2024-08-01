import { Component } from '@angular/core';
import { SharedService } from '../../shared/services/shared.service';

@Component({
  selector: 'app-confirmation-comp',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-comp.component.html',
  styleUrl: './confirmation-comp.component.scss'
})
export class ConfirmationCompComponent {
  constructor(private sharedService: SharedService) {}
  handleConfirm() : void {
    this.sharedService.changeAttribute("payment");
  }
  handleBack() : void {
    this.sharedService.changeAttribute("amount");
  }
}
