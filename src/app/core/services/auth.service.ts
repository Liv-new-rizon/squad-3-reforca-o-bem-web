// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { ILoginData } from '../models/interfaces/ILoginData';
import { ISignupData } from '../models/interfaces/ISignupData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${API_PATH}auth/login`;
  private signupUrl = `${API_PATH}users`;

  constructor(private http: HttpClient) {}

  /**
   * Sends login request to backend
   * @param data Contains email and password
   * @returns Promise with API response
   */
  public loginUser<T>(data: ILoginData): Promise<T> {
    return this.http.post<T>(this.loginUrl, data).toPromise() as Promise<T>;
  }

  /**
   * Sends a registration request to the backend
   * @param data Contains name, email and password
   * @returns Promise with API response
   */
  public signupUser<T>(data: ISignupData): Promise<T> {
    return this.http.post<T>(this.signupUrl, data).toPromise() as Promise<T>;
  }
}
