import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { NavLoginCompComponent } from '../nav-login-comp/nav-login-comp.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'navbar-comp',
  standalone: true,
  imports: [NavLoginCompComponent, NgIf, NgClass, RouterLink, RouterLinkActive],
  templateUrl: './navbar-comp.component.html',
  styleUrl: './navbar-comp.component.scss'
})
export class NavbarCompComponent {
  toggleList: boolean = true;

  listDropdown(): void {
    this.toggleList =!this.toggleList;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateClass();
  }

  updateClass() {
    const width = window.innerWidth;
    if (width < 780) {
      this.toggleList = false;
    }else if (width > 768) {
      this.toggleList = true;

    }
    }
}
