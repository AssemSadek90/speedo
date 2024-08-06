import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferMoneyService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.transferMoney.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
  }
  
  postTransferMoney(amountToSend: number, amountToRecieve: number, currencyToSend: string, currencyToRecieve: string, fromName: string, toName: string, fromAccNum: number, toAccNum: number, fees: number): Observable<any[]>  {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.post<any>(`${this.apiUrl}${this.apiEndPoint}`, {amountToSend, amountToRecieve, currencyToSend, currencyToRecieve, fromName, toName, fromAccNum, toAccNum, fees}, {headers: this.headers})
  }
}
