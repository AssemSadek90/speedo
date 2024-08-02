import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavLoginCompComponent } from '../nav-login-comp/nav-login-comp.component';

@Component({
  selector: 'navbar-comp',
  standalone: true,
  imports: [NavLoginCompComponent, RouterLink, RouterLinkActive],
  templateUrl: './navbar-comp.component.html',
  styleUrl: './navbar-comp.component.scss'
})
export class NavbarCompComponent {

}
