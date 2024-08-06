import { Injectable } from '@angular/core';
import { DataOfForm } from './models/dataOfForm';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private transferStatus: string;
  private formdata!: DataOfForm;

  constructor() {
    this.transferStatus = 'amount';
  }

  setTransferStatusVariable(value: string): void {
    this.transferStatus = value;
  }

  getTransferStatusVariable(): string {
    return this.transferStatus;
  }
  setDataOfForm(value: DataOfForm): void {
    this.formdata = value;
  }

  getDataOfForm(): DataOfForm {
    return this.formdata;
  }
}
