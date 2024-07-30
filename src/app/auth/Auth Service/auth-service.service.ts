import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/app/Shared Services/api-config.service';
import { RoleResponse } from '../models/role-response';
interface SignupResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private endpoint = 'Auth';
  constructor(private apiConfigService: ApiConfigService) { }


  login(model: any): Observable<any> {
    return this.apiConfigService.post<any>(`${this.endpoint}/Login`, model);
  }
  getRoles(): Observable<RoleResponse> {
    return this.apiConfigService.get<RoleResponse>(`${this.endpoint}/GetAllRoles`);
  }

  signup(model: any): Observable<SignupResponse> {
    return this.apiConfigService.post<SignupResponse>(`${this.endpoint}/Register`, model);
  }
}
