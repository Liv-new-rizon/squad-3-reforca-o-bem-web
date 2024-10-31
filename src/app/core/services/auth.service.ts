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
  public loginUser<ILoginResponse>(data: ILoginData): Promise<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.loginUrl, data).toPromise() as Promise<ILoginResponse>;
  }

  /**
   * Sends a registration request to the backend
   * @param data Contains name, email and password
   * @returns Promise with API response
   */
  public signupUser(data: ISignupData): Promise<object> {
    return this.http.post<object>(this.signupUrl, data).toPromise() as Promise<object>;
  }
}