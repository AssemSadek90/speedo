import { DOCUMENT } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UpdataProfileInfoService {

  apiUrl = environment.apiUrl;
  apiEndPoint = environment.updateProfileInfo.endpoint;
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
  updateProfileInfo(firstName:string, lastName:string, email: string, phoneNumber: string, status: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}${this.apiEndPoint}`, {firstName, lastName, email, phoneNumber, status})
  }
}
