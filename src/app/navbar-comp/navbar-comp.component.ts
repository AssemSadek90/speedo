import { Component } from '@angular/core';
import { NavLoginCompComponent } from '../nav-login-comp/nav-login-comp.component';

@Component({
  selector: 'navbar-comp',
  standalone: true,
  imports: [NavLoginCompComponent],
  templateUrl: './navbar-comp.component.html',
  styleUrl: './navbar-comp.component.scss'
})
export class NavbarCompComponent {

}
