import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCompComponent } from './navbar-comp/navbar-comp.component';
import { MobileAppCompComponent } from './mobile-app-comp/mobile-app-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarCompComponent, MobileAppCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'speedo';
}
