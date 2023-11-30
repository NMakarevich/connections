import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  signUp(body: SignUpModel) {
    return this.http.post<Response>('registration', body);
  }
}
