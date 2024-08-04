import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  apiUrl = environment.apiUrl;
  apiEndPoint = environment.register.endpoint;

  id?: number;
  token: string = 'helloworld';
  
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  nationality?: string;
  nationalIdNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  constructor(private http: HttpClient) { }
  async registerRequest(firstName: string|undefined, lastName:string|undefined, email: string|undefined,phoneNumber:string|undefined, address:string|undefined, nationality: string| undefined,nationalIdNumber:string|undefined, gender:string|undefined, dateOfBirth: string| undefined, password:string|undefined): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post<any>(`${this.apiUrl}${this.apiEndPoint}`, { firstName, lastName, email, phoneNumber,address, nationality,nationalIdNumber,gender, dateOfBirth, password, token: this.token }));
      this.id = response.id
      this.firstName = response.firstName;
      this.lastName = response.lastName;
      this.email = response.email;
      this.phoneNumber = response.phoneNumber;
      this.address = response.address;
      this.nationality = response.nationality;
      this.gender = response.gender;
      this.dateOfBirth = response.dateOfBirth;
      this.token = response.token;
      sessionStorage.setItem('username', `${this.firstName} ${this.lastName}`);
      sessionStorage.setItem('token', this.token!);
      sessionStorage.setItem('id', String(this.id!));

  } catch (error) {
    console.error('Registration failed', error);
    throw error;
  }}

}
