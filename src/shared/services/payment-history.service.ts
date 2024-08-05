import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.paymentHistory.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    
  }
  
  getPaymentHistory(): Observable<any[]>  {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`, {headers: this.headers})
  }
}
