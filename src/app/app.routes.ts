import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const routes: Routes = [
  { path: 'myaccount', component: MyAccountComponent,
    children: [
      { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
      { path: 'myprofile', component: MyProfileComponent, },
      { path: 'paymenthistory', component: PaymentHistoryComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'changepassword', component: ChangePasswordComponent },
      {path: '**', redirectTo: 'myprofile'}
    ]
  },
];
