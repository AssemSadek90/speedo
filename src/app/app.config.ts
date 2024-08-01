import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';

// Define your routes
const routes: Routes = [
  { path: 'myprofile', component: MyProfileComponent },
  { path: 'paymenthistory', component: PaymentHistoryComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: '', redirectTo: '/myprofile', pathMatch: 'full' }
];

export const appConfig = {
  providers: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
    MyProfileComponent,
    PaymentHistoryComponent,
    SettingsComponent,
    ChangePasswordComponent,
    MyAccountComponent
  ]
};
