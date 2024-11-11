import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { ILoginData } from '../models/interfaces/ILoginData';
import { ISignupData } from '../models/interfaces/ISignupData';
import { IUserInfo } from '../models/interfaces/IUserInfo';
import { IStudentData } from '../models/interfaces/IStudentData';
import { ITutorData } from '../models/interfaces/ITutorData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${API_PATH}auth/login`;
  private signupUrl = `${API_PATH}users`;
  private meUrl = `${API_PATH}users/me`;
  private profileUrl = `${API_PATH}profile`

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
   * Sends a registration request to the backend
   * @param data Contains name, email and password
   * @returns Promise with API response
   */
  public signupUser(data: ISignupData): Promise<object> {
    return this.http.post<object>(this.signupUrl, data, { headers: this.headers }).toPromise() as Promise<object>;
  }

  /**
   * Retrieves current user information from the backend
   * @returns Promise containing user information
   */
  public getUserInfo(): Promise<IUserInfo> {
    return this.http.get<IUserInfo>(this.meUrl, { headers: this.headers }).toPromise() as Promise<IUserInfo>;
  }

  /**
   * Sends a student registration request to the backend
   * @param data Contains birthDate, educationLevel, schoolType, subjectsOfInterest and phoneNumber
   * @returns Promise with API response
   */
  public signupStudent(data: IStudentData): Promise<object> {
    return this.http.post<object>(this.profileUrl, data, { headers: this.headers }).toPromise() as Promise<object>;
  }
}