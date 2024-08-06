import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleResponse } from '../models/role-response';
import { ApiConfigService } from 'src/app/shared/shared service/api-config.service';
import { LoginResponse } from '../models/login-response';
import { Page, PagesResponse } from 'src/app/pages/lookup/models/pages/page-response';
import { PageDto } from '../models/page-dto';
import { mapPageToPageDto } from '../helpers/page-mapper';

interface SignupResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private endpoint = 'Auth';

  constructor(private apiConfigService: ApiConfigService) { }

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

  validateUserRole(request: any): Observable<PagesResponse> {
    return this.apiConfigService.post<PagesResponse>(`${this.endpoint}/validate-user-role`, request);
  }

  // src/app/auth/Auth Service/auth-service.service.ts

  storeUserData(roleId: string, pages: Page[]): void {
    // Map Page to PageDto before storing
    const pageDtos: PageDto[] = pages.map(mapPageToPageDto);
    const dataToStore = {
      roleId: roleId,
      pages: pageDtos,
      isValid: pageDtos.length > 0
    };
    localStorage.setItem('userPages', JSON.stringify(dataToStore));
  }
  
  

  getUserPages(): any[] {
    const pagesJson = localStorage.getItem('userPages');
    return pagesJson ? JSON.parse(pagesJson) : [];
  }
}
