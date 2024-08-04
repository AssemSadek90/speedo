import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProfileInfoService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.profileInfo.endpoint;
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
  
  getProfileInfo(): Observable<any>  {
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`)
  }
  updateProfileInfo(firstName:string, lastName:string, email: string, phoneNumber: string, status: number): Observable<any> {
    return this.httpClient.put<any>(`${this.apiUrl}${this.apiEndPoint}`, {firstName, lastName, email, phoneNumber})
  }
}
