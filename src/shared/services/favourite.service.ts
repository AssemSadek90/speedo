import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.favorites.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) document: Document) {
    const sessionStorage = document.defaultView?.sessionStorage;
    if(sessionStorage) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
  }
  
  getFavouritesRequest(): Observable<any[]>  {
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`,{headers: this.headers})
  }
  postFavoriteRequest(name: string, account: number, status: number): Observable<any[]> {
    return this.httpClient.post<any>(`${this.apiUrl}${this.apiEndPoint}`, {fullName: name,accNum: account}, {headers: this.headers})
  }
}
