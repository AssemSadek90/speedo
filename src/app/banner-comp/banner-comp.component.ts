import { Component } from '@angular/core';
import { TransferCardCompComponent } from '../transfer-card-comp/transfer-card-comp.component';

@Component({
  selector: 'banner-comp',
  standalone: true,
  imports: [TransferCardCompComponent],
  templateUrl: './banner-comp.component.html',
  styleUrl: './banner-comp.component.scss'
})
export class BannerCompComponent {

}
