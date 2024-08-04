import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoService } from '../../shared/services/profile-info.service';
import { profile } from 'console';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit, OnDestroy {
  profileName!: string;
  profileEmail!: string;
  profilePhone!: string;
  profileGender!: string;
  profileBalance!: number;
  profileInfoSubscription!: Subscription;
  constructor(private profileInfoService: ProfileInfoService) {}
  ngOnInit(): void {
    this.profileInfoService.getProfileInfo().subscribe((res: any) => {
      this.profileName = res.firstName + " " + res.lastName;
      this.profileEmail = res.email;
      this.profilePhone = res.phoneNumber;
      this.profileGender = res.gender;
      this.profileBalance = res.balance;
    })
  }
  ngOnDestroy(): void {
    if (this.profileInfoSubscription) {
      this.profileInfoSubscription.unsubscribe();
    }
  }
}
