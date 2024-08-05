import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.changePassword.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) document: Document) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}}`
    });
  }
  }
  
  updatePassword(oldPassword: string, newPassword: string, status: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}${this.apiEndPoint}`, {oldPassword, newPassword, status})
  }
}
