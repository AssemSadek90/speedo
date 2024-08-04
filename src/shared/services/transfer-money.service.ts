import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.transferMoney.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) document: Document) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}}`
    });
  }
  }
  
  postTransferMoney(amountToSend: number, amountToRecieve: number, currencyToSend: string, currencyToRecieve: string, fromName: string, toName: string, fromAccNum: number, toAccNum: number, fees: number, status :number): Observable<any[]>  {
    return this.httpClient.post<any>(`${this.apiUrl}${this.apiEndPoint}`, {amountToSend, amountToRecieve, currencyToSend, currencyToRecieve, fromName, toName, fromAccNum, toAccNum, fees, status})
  }
}
