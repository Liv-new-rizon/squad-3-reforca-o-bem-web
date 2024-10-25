import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private apiUrl = `${API_PATH}api`;

  constructor(private http: HttpClient) {}

  /**
   * Sends a registration request to the backend
   * @param data Contains name, email and password
   * @returns Observable with API response
   */
  signupUser(data: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
