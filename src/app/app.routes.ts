import { Routes } from '@angular/router';
import { TransferCompComponent } from './transfer-comp/transfer-comp.component';
import { AmountCompComponent } from './amount-comp/amount-comp.component';
import { ConfirmationCompComponent } from './confirmation-comp/confirmation-comp.component';
import { ConfirmationGaurdService } from '../shared/services/gaurds/confirmation/confirmation-gaurd.service';
import { PaymentCompComponent } from './payment-comp/payment-comp.component';
import { PaymentGaurdService } from '../shared/services/gaurds/payment/payment-gaurd.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'transfer',
    component: TransferCompComponent,
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
];
