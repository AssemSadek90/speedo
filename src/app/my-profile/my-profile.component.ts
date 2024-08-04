import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  Balances = [
    { name: 'Account 1', balance: 1000 },
  ]
  profiles = [
    {
      name: 'Jonathon Smith',
      email: 'jhonathonsmith@gmail.com',
      phone: '+880125412624',
      gender: 'Male'
    }
  ];
}
