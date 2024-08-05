import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterModalService } from '../../shared/services/register-modal.service';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})
export class Error404Component {
  constructor(private router: Router, private registerModalService: RegisterModalService){}
  handleRegister (): void {
    this.router.navigate(['']);
    this.registerModalService.openRegisterModal()
  }
}
