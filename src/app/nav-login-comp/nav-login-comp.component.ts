import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-login-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-login-comp.component.html',
  styleUrl: './nav-login-comp.component.scss'
})
export class NavLoginCompComponent {
  isLoginModalHidden: boolean = true;
  isRegisterModalHidden: boolean = true;
  handleOpenLoginModal() {
    this.isLoginModalHidden = !this.isLoginModalHidden;
  }
  handleOpenRegisterModal() {
    this.isRegisterModalHidden = !this.isRegisterModalHidden;
  }
}
