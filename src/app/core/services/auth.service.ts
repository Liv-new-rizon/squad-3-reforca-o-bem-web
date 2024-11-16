import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { ILoginData } from '../models/interfaces/ILoginData';
import { IUserInfo } from '../models/interfaces/IUserInfo';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${API_PATH}auth/login`;
  private signupUrl = `${API_PATH}users`;
  private meUrl = `${API_PATH}users/me`;
  private studentUrl = `${API_PATH}profile/student`
  private tutorUrl = `${API_PATH}profile/tutor`

  constructor(private http: HttpClient) {}

  /**
   * Gets the HTTP headers with authorization token if available
   * Returns HttpHeaders object with or without authorization token
   */
  protected get headers(): HttpHeaders {
    const bearerToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
    if (bearerToken) {
      return new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  /**
   * Sends login request to backend
   * @param data Contains email and password
   * @returns Promise with API response
   */
  public loginUser<ILoginResponse>(data: ILoginData): Promise<ILoginResponse> {
    return this.http.post<ILoginResponse>(this.loginUrl, data, { headers: this.headers }).toPromise() as Promise<ILoginResponse>;
  }

  /**
   * Sends a user, student or tutor registration request to the backend
   * @param data The infos that will be registered
   * @param type Indicates the type of registration ('user', 'student' or 'tutor')
   * @returns Promise with API response
   */
  public signup<T>(data: T, type: 'user' | 'student' | 'tutor'): Promise<T> {
    let url: string;
    
    switch(type) {
      case 'user':
        url = this.signupUrl;
        break;
      case 'student':
        url = this.studentUrl;
        break;
      case 'tutor':
        url = this.tutorUrl;
        break;
    }
    
    return this.http.post<T>(url, data, { headers: this.headers }).toPromise() as Promise<T>;
  }

  /**
   * Retrieves current user information from the backend
   * @returns Promise containing user information
   */
  public getUserInfo(): Promise<IUserInfo> {
    return this.http.get<IUserInfo>(this.meUrl, { headers: this.headers }).toPromise() as Promise<IUserInfo>;
  }
}