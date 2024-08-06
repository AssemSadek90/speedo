import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.profileInfo.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  
  getProfileInfo(): Observable<any>  {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`, {headers: this.headers})
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
