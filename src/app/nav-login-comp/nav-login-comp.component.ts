import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgClass, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { eachYearOfInterval, getDaysInMonth } from 'date-fns';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { LoginDropdownComponent } from '../login-dropdown/login-dropdown.component';
import { RegisterModalService } from '../../shared/services/register-modal.service';
import { RegisterServiceService } from '../../shared/services/register-service.service';

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

   phoneNumber = "+1234567890";
   address= "123 Main St";
   nationalIdNumber= "12345678901234";
   gender= "MALE";
   
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    nationality: new FormControl('', [Validators.required]),
    day: new FormControl('', [Validators.required]),
    month: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(private loginService: LoginService,private registerService: RegisterServiceService, private registerModalService: RegisterModalService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.years = eachYearOfInterval({ start: new Date().setFullYear(this.selectedYear - 100), end: new Date() }).map(date => date.getFullYear());
    this.updateDays();
  }
  ngOnInit() {
    this.registerModalService.registerModalVisible$.subscribe((isVisible) => {
      this.isRegisterModalHidden = !isVisible;
    });
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage.getItem('token') !== null) {
      this.tokenAvailable = true;
  }
    }
    
  }

  updateDays() {
    const daysInMonth = getDaysInMonth(new Date(this.selectedYear, this.selectedMonth - 1));
    this.days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  onDayChange(day: number) {
    this.registerForm.controls.day.setValue(String(day));
  }

  onMonthChange(month: number) {
    this.selectedMonth = month;
    this.updateDays();
    this.registerForm.controls.month.setValue(String(this.selectedMonth));
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.updateDays();
    this.registerForm.controls.year.setValue(String(this.selectedYear));
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

  async onSubmitRegister() {
    if (this.registerForm.invalid) return;
    let dateOfBirth = `${this.registerForm.get('year')?.value}-${this.registerForm.get('month')?.value}-${this.registerForm.get('day')?.value}`;
    try{
      await this.registerService.registerRequest(this.registerForm.get('firstName')?.value!, this.registerForm.get('lastName')?.value!, this.registerForm.get('email')?.value!,"01064065523","123 Main St", this.registerForm.get('nationality')?.value!,"12345678901234","MALE",dateOfBirth,  this.registerForm.get('password')?.value!);
      this.tokenAvailable = this.registerService.id !== undefined;
      this.registerModalService.closeRegisterModal();
    }catch(error){
      console.error('Register failed', error);
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
    this.registerModalService.openRegisterModal()
  }
  handleCloseRegisterModal() {
    this.registerModalService.closeRegisterModal()
  }

  handleCreateAccount() {
    this.handleOpenLoginModal();
    this.registerModalService.openRegisterModal();
  }
  handleLoginFromRegister() {
    this.registerModalService.closeRegisterModal();
    this.handleOpenLoginModal();
  }

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  handleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  handleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
