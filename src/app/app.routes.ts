import { Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const routes: Routes = [
  { path: 'myprofile', component: MyProfileComponent },
  { path: 'paymenthistory', component: PaymentHistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: '', redirectTo: '/myprofile', pathMatch: 'full' }
];
