import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RoleResponse } from '../models/role-response';
import { ApiConfigService } from 'src/app/shared/shared service/api-config.service';
import { LoginResponse } from '../models/login-response';
interface SignupResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private endpoint = 'Auth';
  constructor(private apiConfigService: ApiConfigService) { }


  // login(model: any): Observable<any> {
  //   return this.apiConfigService.post<any>(`${this.endpoint}/Login`, model);
  // }

  login(model: any): Observable<LoginResponse> {
    return this.apiConfigService.post<LoginResponse>(`${this.endpoint}/Login`, model);
  }

  getRoles(): Observable<RoleResponse> {
    return this.apiConfigService.get<RoleResponse>(`${this.endpoint}/GetAllRoles`);
  }

  signup(model: any): Observable<SignupResponse> {
    return this.apiConfigService.post<SignupResponse>(`${this.endpoint}/Register`, model);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}
