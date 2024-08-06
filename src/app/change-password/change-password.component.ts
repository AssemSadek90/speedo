import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangePasswordService } from '../../shared/services/change-password.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { ValidatorsService } from '../../shared/services/validators/validators.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnDestroy {
  oldPassword!: string;
  newPassword!: string;
  changePasswordSubscription!: Subscription;
  changePasswordMessage!: string;
  isSubmitted: boolean = false;
  changePasswordForm: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, this.validatorsService.strongPasswordValidator])
  })
  constructor(private changePasswordService: ChangePasswordService, private validatorsService : ValidatorsService) {}
  handleSubmit(form: FormGroup) {
    this.isSubmitted = true;
    if (form.invalid) {
      this.changePasswordMessage = "Please fill all fields correctly";
      return;
    }
    this.changePasswordSubscription = this.changePasswordService.updatePassword(form.value.oldPassword, form.value.newPassword).subscribe({next: (res) => {
      this.changePasswordMessage = "Password updated successfully"
    },
    error: (err) => {
      this.changePasswordMessage = err.error.detail;
    }
  })
  }
  ngOnDestroy(): void {
      if (this.changePasswordSubscription) {
        this.changePasswordSubscription.unsubscribe()
      }
  }
}
