import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferCardCompComponent } from '../transfer-card-comp/transfer-card-comp.component';
import { RegisterModalService } from '../../shared/services/register-modal.service';

@Component({
  selector: 'banner-comp',
  standalone: true,
  imports: [TransferCardCompComponent, CommonModule],
  templateUrl: './banner-comp.component.html',
  styleUrl: './banner-comp.component.scss'
})
export class BannerCompComponent {
  isRegisterModalOpen = false;
  isExchangeRateOpen = false;
  constructor(private registerModalService: RegisterModalService) { }
  ngOnInit() {
    this.registerModalService.registerModalVisible$.subscribe((isVisible) => {
      this.isRegisterModalOpen = !isVisible;
    });
  }
  handleCreateAccount(){
    this.registerModalService.openRegisterModal();
  }
  handleExchangeRate(){
    this.isExchangeRateOpen = !this.isExchangeRateOpen;
  }
}
