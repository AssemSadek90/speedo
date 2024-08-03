import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  
  
];

export const appConfig = {
  providers: [
    RouterModule.forRoot(routes)
  ],
  declarations: [
    ChangePasswordComponent,
   ProfileComponent
  ]
};
