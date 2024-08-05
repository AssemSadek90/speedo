import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UpdataProfileInfoService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.updateProfileInfo.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    const sessionStorage = document.defaultView?.sessionStorage;
    
  }
  updateProfileInfo(firstName:string, lastName:string, email: string, phoneNumber: string): Observable<any> {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.put<any>(`${this.apiUrl}${this.apiEndPoint}`, {firstName, lastName, email, phoneNumber}, {headers: this.headers})
  }
}
