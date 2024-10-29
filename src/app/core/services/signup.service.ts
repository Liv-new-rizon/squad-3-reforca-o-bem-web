import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { SignupDataInterface } from '../models/interfaces/signup-data.interface';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${API_PATH}users`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a registration request to the backend
   * @param data Contains name, email and password
   * @returns Promise with API response
   */
  public signupUser<T>(data: SignupDataInterface): Promise<T> {
    return this.http.post<T>(this.apiUrl, data).toPromise() as Promise<T>;
  }
}
