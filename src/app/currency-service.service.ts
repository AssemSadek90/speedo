import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiUrl = ' https://v6.exchangerate-api.com/v6/1e8de30e1a9061046b8c341a/latest/';

  constructor(private http: HttpClient) { }

  getExchangeRate(baseCurrency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${baseCurrency}`);
  }
}
