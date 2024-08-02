import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
import { PaymentHistoryComponent } from '../payment-history/payment-history.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink,SettingsComponent,PaymentHistoryComponent,ChangePasswordComponent,MyProfileComponent,AppComponent],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {}
