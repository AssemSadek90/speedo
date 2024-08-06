import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.favorites.endpoint;
  headers!: HttpHeaders;
 
  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }
  deleteFavouriteRequest(accNum: number): Observable<any[]> {
    if(isPlatformBrowser(this.platformId)) {
      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.delete<any>(`${this.apiUrl}${this.apiEndPoint}/${accNum}`,{headers: this.headers})
  }
  
  getFavouritesRequest(): Observable<any[]>  {
    if(isPlatformBrowser(this.platformId)) {
      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.get<any>(`${this.apiUrl}${this.apiEndPoint}`,{headers: this.headers})
  }
  postFavoriteRequest(name: string, account: number): Observable<any[]> {
    if(isPlatformBrowser(this.platformId)) {

      this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
    });
  }
    return this.httpClient.post<any>(`${this.apiUrl}${this.apiEndPoint}`, {fullName: name,accNum: account}, {headers: this.headers})
  }
}
