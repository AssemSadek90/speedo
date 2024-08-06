import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { TransferCompComponent } from './transfer-comp/transfer-comp.component';
import { AmountCompComponent } from './amount-comp/amount-comp.component';
import { ConfirmationCompComponent } from './confirmation-comp/confirmation-comp.component';
import { ConfirmationGaurdService } from '../shared/services/gaurds/confirmation/confirmation-gaurd.service';
import { PaymentCompComponent } from './payment-comp/payment-comp.component';
import { PaymentGaurdService } from '../shared/services/gaurds/payment/payment-gaurd.service';
import { HomeCompComponent } from './home-comp/home-comp.component';
import { Error404Component } from './error404/error404.component';
import { TransferGaurdService } from '../shared/services/gaurds/transfer/transfer-gaurd.service';
import { MyAcountGaurdService } from '../shared/services/gaurds/myAccount/my-acount-gaurd.service';


export const routes: Routes = [
    { path: '', component: HomeCompComponent},
  {
    path: 'transfer',
    component: TransferCompComponent,
    canActivate: [TransferGaurdService],
    children: [
      { path: '', redirectTo: 'amount', pathMatch: 'full' },
      { path: 'amount', component: AmountCompComponent },
      {
        path: 'confirmation',
        component: ConfirmationCompComponent,
        canActivate: [ConfirmationGaurdService],
      },
      {
        path: 'payment',
        component: PaymentCompComponent,
        canActivate: [PaymentGaurdService],
      },
      { path: '**', redirectTo: 'amount' },
    ],
  },
  { path: 'myaccount', component: MyAccountComponent, canActivate: [MyAcountGaurdService],
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
  { path: 'error404', component: Error404Component },
];
