import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';

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
  public signupUser(data: { name: string; email: string; password: string; confirmPassword: string }): Promise<any> {
    return this.http.post<any>(this.apiUrl, data).toPromise();
  }
}
