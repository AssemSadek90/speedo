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
  firstName: string = "john";
  lastName: string = "doe";

  constructor(private http: HttpClient) { }

  async loginRequest(email: string | undefined, password: string | undefined): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}${this.apiEndPoint}`, { email, password, token: this.token, firstName: this.firstName, lastName: this.lastName }));
      this.token = response.token;
      this.id = response.id;
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      sessionStorage.setItem('token', this.token!);
      sessionStorage.setItem('id', String(this.id!));
      sessionStorage.setItem('username', `${this.firstName} ${this.lastName}`);
      return response;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }
}
