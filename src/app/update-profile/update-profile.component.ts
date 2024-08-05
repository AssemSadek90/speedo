import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileInfoService } from '../../shared/services/profile-info.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdataProfileInfoService } from '../../shared/services/updata-profile-info.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  firstName!: string;
  lastName!: string;
  email!: string;
  phoneNumber!: string;
  messageUpdate!: string;

  getProfileInfoSubscription!: Subscription;
  updateProfileInfoSubscription!: Subscription;
  constructor(private profileService: ProfileInfoService,private updataProfileInfoService: UpdataProfileInfoService){}
  ngOnInit(): void {
      this.getProfileInfoSubscription = this.profileService.getProfileInfo().subscribe((res: any) => {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.email = res.email;
        this.phoneNumber = res.phoneNumber;
      })
  }
  handleSubmit(form: NgForm) {
    if (!form.valid) {
      this.messageUpdate = "Please fill all fields correctly";
      return;
    }
    this.updateProfileInfoSubscription = this.updataProfileInfoService.updateProfileInfo(form.value.firstName, form.value.lastName, form.value.email, form.value.phoneNumber).subscribe(res => {
      if (res.firstName) {
        this.messageUpdate = "The profile was successfully updated";
      }else {
        this.messageUpdate = "There is an error updating the profile"
      }
    })
  }
  ngOnDestroy(): void {
      if (this.getProfileInfoSubscription) {
        this.getProfileInfoSubscription.unsubscribe();
      }
      if (this.updateProfileInfoSubscription) {
        this.updateProfileInfoSubscription.unsubscribe();
      }
  }
}
