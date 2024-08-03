import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.login.endpoint;

  id?: number;
  token: string = 'helloworld';

  constructor(private http: HttpClient) { }

  async loginRequest(username: string | undefined, password: string | undefined): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}${this.apiEndPoint}`, { username, password, token: this.token }));
      this.token = response.token;
      this.id = response.id;
      sessionStorage.setItem('token', this.token!);
      sessionStorage.setItem('id', String(this.id!));
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }
}
