import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCompComponent } from './navbar-comp/navbar-comp.component';
import { MobileAppCompComponent } from './mobile-app-comp/mobile-app-comp.component';
import { FooterCompComponent } from './footer-comp/footer-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarCompComponent, MobileAppCompComponent, FooterCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'speedo';
}
