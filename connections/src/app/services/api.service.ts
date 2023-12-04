import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SignInModel,
  SignInResponseModel,
  SignUpModel,
} from '../models/auth.model';
import { ProfileModel } from '../models/profile.model';

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

  getProfile() {
    return this.http.get<ProfileModel>('profile');
  }

  updateProfileName(name: string) {
    return this.http.put('profile', { name });
  }
}
