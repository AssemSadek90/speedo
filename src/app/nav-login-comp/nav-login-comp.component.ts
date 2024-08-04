import { Component, HostListener } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { eachYearOfInterval, getDaysInMonth } from 'date-fns';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { LoginDropdownComponent } from '../login-dropdown/login-dropdown.component';

@Component({
  selector: 'nav-login-comp',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, NgClass, RouterLink, LoginDropdownComponent],
  templateUrl: './nav-login-comp.component.html',
  styleUrl: './nav-login-comp.component.scss'
})
export class NavLoginCompComponent {
  days: number[] = [];
  months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' }
  ];
  years: number[] = [];
  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = 1;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService) {
    this.years = eachYearOfInterval({ start: new Date().setFullYear(this.selectedYear - 100), end: new Date() }).map(date => date.getFullYear());
    this.updateDays();
  }

  updateDays() {
    const daysInMonth = getDaysInMonth(new Date(this.selectedYear, this.selectedMonth - 1));
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  onMonthChange(month: number) {
    this.selectedMonth = month;
    this.updateDays();
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.updateDays();
  }

  tokenAvailable: boolean = this.loginService.id !== undefined;

  async onSubmit() {
    if (this.loginForm.invalid) return;

    try {
      const { email, password } = this.loginForm.value;
      await this.loginService.loginRequest(email!, password!);
      this.tokenAvailable = this.loginService.id !== undefined;
      this.isLoginModalHidden = true;
    } catch (error) {
      console.error('Login failed', error);
      this.tokenAvailable = false;
    }
  }
  handleLogout() {
    this.tokenAvailable = false;
  }

  isLoginModalHidden: boolean = true;
  isRegisterModalHidden: boolean = true;
  handleOpenLoginModal() {
    this.isLoginModalHidden = !this.isLoginModalHidden;
  }
  handleOpenRegisterModal() {
    this.isRegisterModalHidden = !this.isRegisterModalHidden;
  }
}
