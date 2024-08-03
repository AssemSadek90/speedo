import { Component, HostListener } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { eachYearOfInterval, eachDayOfInterval, endOfYear, startOfYear, getDaysInMonth } from 'date-fns';
@Component({
  selector: 'nav-login-comp',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
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
  constructor() {
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


  isLoginModalHidden: boolean = true;
  isRegisterModalHidden: boolean = true;
  handleOpenLoginModal() {
    this.isLoginModalHidden = !this.isLoginModalHidden;
  }
  handleOpenRegisterModal() {
    this.isRegisterModalHidden = !this.isRegisterModalHidden;
  }
}
