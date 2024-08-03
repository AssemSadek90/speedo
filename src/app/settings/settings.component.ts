import { Component } from '@angular/core';
import { RouterOutlet, RouterLink ,RouterModule} from '@angular/router';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ RouterLink,RouterOutlet, RouterModule,ChangePasswordComponent,UpdateProfileComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
