import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/app/shared/shared service/api-config.service';
import { LoginResponse } from '../models/login-response';

import { PageDto } from '../models/page-dto';
import { mapPageToPageDto } from '../helpers/page-mapper';
import { RoleResponse } from '../models/role-response';
import { PageRle, PageRleResponse } from '../models/page-rle-response';

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

  validateUserRole(request: any): Observable<PageRleResponse> {
    return this.apiConfigService.post<PageRleResponse>(`${this.endpoint}/validate-user-role`, request);
  }

  storeUserData(roleCode: string, pages: PageRle[]): void {
    const pageDtos: PageDto[] = pages.map(page => ({
      pageId: page.pageId,
      pageName: page.pageName,
      pagePath: page.pagePath
    }));
    const dataToStore = {
      roleCode: roleCode,
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
