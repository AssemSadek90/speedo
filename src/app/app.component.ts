import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCompComponent } from './navbar-comp/navbar-comp.component';
import { MobileAppCompComponent } from './mobile-app-comp/mobile-app-comp.component';
import { FooterCompComponent } from './footer-comp/footer-comp.component';
import { BannerCompComponent } from './banner-comp/banner-comp.component';
import { GettingStartedCompComponent } from './getting-started-comp/getting-started-comp.component';
import { HomeCompComponent } from './home-comp/home-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarCompComponent, MobileAppCompComponent, FooterCompComponent, BannerCompComponent, GettingStartedCompComponent, HomeCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'speedo';
}
