import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const routes: Routes = [
  { path: 'myaccount', component: MyAccountComponent,
    children: [
      { path: '', redirectTo: 'myprofile', pathMatch: 'full' },
      { path: 'myprofile', component: MyProfileComponent, },
      { path: 'paymenthistory', component: PaymentHistoryComponent },
      { path: 'settings', component: SettingsComponent, 
        children:[
          { path: '', redirectTo: 'updateProfile', pathMatch: 'full' },
          { path: 'updateProfile', component: UpdateProfileComponent},
          { path: 'changepassword', component: ChangePasswordComponent }
        ]
       },
      { path: 'settings', component:SettingsComponent, 
        children:[
         { path: '', redirectTo: 'changepassword', pathMatch: 'full' },
         { path: 'changepassword', component: ChangePasswordComponent }
        ]
       },
      {path: '**', redirectTo: 'myprofile'}
    ]
  },
];
