import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SignInModel,
  SignInResponseModel,
  SignUpModel,
} from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  registration(body: SignUpModel) {
    return this.http.post<Response>('registration', body);
  }

  login(body: SignInModel) {
    return this.http.post<SignInResponseModel>('login', body);
  }

  logout() {
    return this.http.delete('logout');
  }
}
