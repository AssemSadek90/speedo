import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.changePassword.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  
  updatePassword(oldPassword: string, newPassword: string): Observable<any> {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.put<any>(`${this.apiUrl}${this.apiEndPoint}`, {oldPassword, newPassword}, {headers: this.headers})
  }
}
