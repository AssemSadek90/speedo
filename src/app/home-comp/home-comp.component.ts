import { Component } from '@angular/core';
import { BannerCompComponent } from '../banner-comp/banner-comp.component';
import { GettingStartedCompComponent } from '../getting-started-comp/getting-started-comp.component';

@Component({
  selector: 'home-comp',
  standalone: true,
  imports: [BannerCompComponent, GettingStartedCompComponent],
  templateUrl: './home-comp.component.html',
  styleUrl: './home-comp.component.scss'
})
export class HomeCompComponent {

}
