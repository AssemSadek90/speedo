import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarCompComponent } from './navbar-comp/navbar-comp.component';
import { MobileAppCompComponent } from './mobile-app-comp/mobile-app-comp.component';
import { FooterCompComponent } from './footer-comp/footer-comp.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { Error404Component } from './error404/error404.component';
import { TransferCompComponent } from "./transfer-comp/transfer-comp.component";
import { ReactiveFormsModule } from '@angular/forms';
import { BannerCompComponent } from './banner-comp/banner-comp.component';
import { GettingStartedCompComponent } from './getting-started-comp/getting-started-comp.component';
import { HomeCompComponent } from './home-comp/home-comp.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarCompComponent, MobileAppCompComponent, FooterCompComponent, MyAccountComponent, Error404Component, TransferCompComponent,ReactiveFormsModule, BannerCompComponent, GettingStartedCompComponent, HomeCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  title = 'speedo';
}
