import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { InactivityService } from '../../shared/services/inactivity.service';
@Component({
  selector: 'login-dropdown',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login-dropdown.component.html',
  styleUrl: './login-dropdown.component.scss'
})
export class LoginDropdownComponent {
  @Output() loggedOut = new EventEmitter<void>();
  isDropdownOpen = false;
  username: string | null = sessionStorage.getItem('username');
  initials: string | undefined;
  ngOnInit() { this.getItitials() ; this.capitalizeUsername(); }

  getItitials() {
    this.initials = sessionStorage.getItem('username')?.split(' ').map(name => name[0]).join('');
    this.initials = this.initials?.toUpperCase()
  }
  capitalizeUsername() {
    if (this.username) {
      this.username = this.username.split(' ')
        .map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
        .join(' ');
    }
  }
  constructor(private router: Router, private inactivityService: InactivityService) {
    this.inactivityService.inactivity$.subscribe({
      next: () => {
        if (sessionStorage.getItem('token')) {window.alert('You have been logged out due to inactivity')};
        this.onLogout();
      },
      error: (error) => console.error('Error logging out', error)
    });
   }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onLogout() {
    if (!sessionStorage.getItem('token')) return;
    this.loggedOut.emit();
    this.router.navigate(['/']);
    this.toggleDropdown()
    sessionStorage.clear();
  }
  
}
