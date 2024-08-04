import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterModalService {
  private registerModalVisibleSubject = new BehaviorSubject<boolean>(false);
  registerModalVisible$ = this.registerModalVisibleSubject.asObservable();

  constructor() {}

  openRegisterModal() {
    this.registerModalVisibleSubject.next(true);
  }

  closeRegisterModal() {
    this.registerModalVisibleSubject.next(false);
  }
}
