import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public transferStatus: string;

  constructor() {
    this.transferStatus = 'amount';
  }

  setTransferStatusVariable(value: string): void {
    this.transferStatus = value;
  }

  getTransferStatusVariable(): string {
    return this.transferStatus;
  }
}
