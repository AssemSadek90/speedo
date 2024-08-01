import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public transferStatus: string;

  constructor() {
    this.transferStatus = 'amount';
  }

  setGlobalVariable(value: string): void {
    this.transferStatus = value;
  }

  getGlobalVariable(): string {
    return this.transferStatus;
  }
}
