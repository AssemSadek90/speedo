import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ChangePasswordService } from '../../shared/services/change-password.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnDestroy {
  oldPassword!: string;
  newPassword!: string;
  changePasswordSubscription!: Subscription;
  changePasswordMessage!: string;
  constructor(private changePasswordService: ChangePasswordService) {}
  handleSubmit(form: NgForm) {
    if (form.invalid) {
      this.changePasswordMessage = "Please fill all fields correctly";
      return;
    }
    this.changePasswordSubscription = this.changePasswordService.updatePassword(form.value.oldPassword, form.value.newPassword, 200).subscribe(res => {
      if (res.status === 200) {
        this.changePasswordMessage = "Password updated successfully"
      }else {
        this.changePasswordMessage = "There was an error updating"
      }
    })
  }
  ngOnDestroy(): void {
      if (this.changePasswordSubscription) {
        this.changePasswordSubscription.unsubscribe()
      }
  }
}
