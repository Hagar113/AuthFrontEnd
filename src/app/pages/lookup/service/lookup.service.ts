import { Injectable } from '@angular/core';
import { ApiConfigService } from 'src/app/Shared Services/api-config.service';

import { Observable } from 'rxjs';

import { Subject, SubjectResponse } from '../models/subjects/subject-response';

import { SaveRoleRequest } from '../models/roles/save-role-request';
import { RoleResponse } from '../models/roles/role-response';
import { BaseRequestHeader } from '../models/roles/base-request-header';
import { DeleteSubjectRequest } from '../models/subjects/delete-subject-request';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private endpoint = 'Admin';
  private subjectsEndpoint = 'Admin';
  constructor(private apiConfigService: ApiConfigService) { }

  getAllRoles(): Observable<RoleResponse> {
    return this.apiConfigService.get<RoleResponse>(`${this.endpoint}/GetAllRoles`);
  }
  

  getRoleById(id: number): Observable<RoleResponse> {
    const requestPayload = {
      userId: null, 
      languageCode: 'en', 
      data: JSON.stringify({ roleId: id })
    };
  
    return this.apiConfigService.post<RoleResponse>(`${this.endpoint}/GetRoleById`, requestPayload);
  }
  saveRole(requestPayload: BaseRequestHeader): Observable<void> {
    return this.apiConfigService.post<void>(`${this.endpoint}/SaveRole`, requestPayload);
  }
  
  

  deleteRole(roleId: number): Observable<void> {
    const requestPayload = {
      userId: null, 
      languageCode: 'en', 
      data: JSON.stringify({ RoleId: roleId })
    };
  
    return this.apiConfigService.post<void>(`${this.endpoint}/DeleteRole`, requestPayload);
  }
  
  getAllSubjects(): Observable<SubjectResponse> {
    const requestPayload: BaseRequestHeader = {
      userId: 0,  
      languageCode: 'en',
      data: 'string' 
    };

    return this.apiConfigService.post<SubjectResponse>(`${this.subjectsEndpoint}/GetAllSubjects`, requestPayload);
  }
  getSubjectById(id: number): Observable<SubjectResponse> {
    const requestPayload: BaseRequestHeader = {
      userId: null,
      languageCode: 'en',
      data: JSON.stringify({ SubjectId: id })
    };
  
    return this.apiConfigService.post<SubjectResponse>(`${this.subjectsEndpoint}/GetSubjectById`, requestPayload);
  }
  

  saveSubject(requestPayload: BaseRequestHeader): Observable<void> {
    return this.apiConfigService.post<void>(`${this.subjectsEndpoint}/SaveSubject`, requestPayload);
  }

  // Delete subject
  deleteSubject(deleteSubjectRequest: DeleteSubjectRequest): Observable<void> {
    const requestPayload: BaseRequestHeader = {
      userId: 0,  
      languageCode: 'en',
      data: deleteSubjectRequest
    };
    return this.apiConfigService.post<void>(`${this.subjectsEndpoint}/DeleteSubject`, requestPayload);
  }
}