import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.paymentHistory.endpoint;
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
  
  getPaymentHistory(): Observable<any[]>  {
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`)
  }
}
