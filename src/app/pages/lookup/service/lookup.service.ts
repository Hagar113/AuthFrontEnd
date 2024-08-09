import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators'; // استيراد map من rxjs

import { Observable } from 'rxjs';

import { Subject, SubjectResponse } from '../models/subjects/subject-response';

import { SaveRoleRequest } from '../models/roles/save-role-request';
import { Role, RoleResponse } from '../models/roles/role-response';

import { DeleteSubjectRequest } from '../models/subjects/delete-subject-request';
import { ApiConfigService } from 'src/app/shared/shared service/api-config.service';
import { BaseRequestHeader } from 'src/app/shared/models/base-request-header';
import { Page, PagesResponse } from '../models/pages/page-response';
import { UserResponse, UserResponseWrapper } from '../models/users/user-response';
import { SaveUserRequest } from '../models/users/save-user-request';
import { RoleRrsDropdown } from '../models/users/role-rrs-dropdown';
import { Roles, RolesResponse } from '../models/roles/get-all-roles-res';
import { TeacherResponse } from '../models/teachers/teacher-response';
import { RoleRequest } from '../models/roles/role-request';
import { GetAssignedRoles } from '../models/users/get-assigned-roles';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private endpoint = 'Admin';
  private subjectsEndpoint = 'Admin';
  private pagesEndpoint = 'Admin';
  private usersEndpoint = 'Admin';
  constructor(private apiConfigService: ApiConfigService) { }

  getAllRoles(): Observable<RoleResponse> {
    return this.apiConfigService.get<RoleResponse>(`${this.endpoint}/GetAllRoles`);
  }
  
  getRoles(): Observable<RolesResponse> {
    return this.apiConfigService.get<RolesResponse>(`${this.endpoint}/GetAllRoles`);
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
  // Pages
  getAllPages(): Observable<PagesResponse> {
    const requestPayload: BaseRequestHeader = {
      userId: 0,
      languageCode: 'en',
      data: ''
    };
  
    return this.apiConfigService.get<PagesResponse>(`${this.pagesEndpoint}/GetAllPages`);
  }
  
  getPageById(id: number): Observable<PagesResponse> {
    const requestPayload: BaseRequestHeader = {
      userId: null,
      languageCode: 'en',
      data: JSON.stringify({ PageId: id })
    };
  
    return this.apiConfigService.post<PagesResponse>(`${this.pagesEndpoint}/GetPageById`, requestPayload);
  }

  savePage(requestPayload: BaseRequestHeader): Observable<void> {
    return this.apiConfigService.post<void>(`${this.pagesEndpoint}/SavePage`, requestPayload);
  }

  deletePage(pageId: number): Observable<void> {
    const requestPayload: BaseRequestHeader = {
      userId: 0,  
      languageCode: 'en',
      data: JSON.stringify({ PageId: pageId })
    };
    return this.apiConfigService.post<void>(`${this.pagesEndpoint}/DeletePage`, requestPayload);
  }

////////////////////////////////////
getAllUsers(): Observable<UserResponseWrapper> {
  const requestPayload: BaseRequestHeader = {
    userId: 0,
    languageCode: 'en',
    data: ''
  };

  return this.apiConfigService.post<UserResponseWrapper>(`${this.usersEndpoint}/GetAllUsers`, requestPayload);
}

getUserById(id: number): Observable<UserResponseWrapper> {
  const requestPayload: BaseRequestHeader = {
    userId: null,
    languageCode: 'en',
    data: JSON.stringify({ UserId: id })
  };

  return this.apiConfigService.post<UserResponseWrapper>(`${this.usersEndpoint}/GetUserById`, requestPayload);
}
saveUser(requestPayload: SaveUserRequest): Observable<void> {
  const baseRequestHeader: BaseRequestHeader = {
    userId: 0, // أو أي قيمة مناسبة
    languageCode: 'en', // أو أي قيمة مناسبة
    data: JSON.stringify(requestPayload) // تحويل الكائن إلى سلسلة JSON
  };

  return this.apiConfigService.post<void>(`${this.usersEndpoint}/SaveUser`, baseRequestHeader);
}

getAllTeachers(): Observable<{ success: boolean, result: TeacherResponse[], responseMessage?: string }> {
  const requestPayload = { userId: 0, languageCode: 'en', data: '' };
  return this.apiConfigService.post<{ success: boolean, result: TeacherResponse[], responseMessage?: string }>(`${this.usersEndpoint}/GetAllTeachers`, requestPayload);
}

assignSubjectToTeacher(teacherId: number, subjectId: number): Observable<number> {
  const requestPayload = { teacherId, subjectId };
  return this.apiConfigService.post<number>(`${this.usersEndpoint}/AssignSubjectToTeacher`, requestPayload);
}
// saveUser(requestPayload: SaveUserRequest): Observable<void> {
//   const baseRequestHeader: BaseRequestHeader = {
//     userId: null,
//     languageCode: 'en',
//     data: JSON.stringify(requestPayload) // تأكد من أن requestPayload متوافق مع SaveUserRequest
//   };

//   return this.apiConfigService.post<void>(`${this.usersEndpoint}/SaveUser`, baseRequestHeader);
// }
deleteUser(userId: number): Observable<void> {
  const requestPayload: BaseRequestHeader = {
    userId: 0,
    languageCode: 'en',
    data: JSON.stringify({ UserId: userId })
  };
  return this.apiConfigService.post<void>(`${this.usersEndpoint}/DeleteUser`, requestPayload);
}


// getAssignedPagesForRole(req: RoleRequest): Observable<Page[]> {
//   const requestPayload = {
//     userId: 0,
//     languageCode: 'en',
//     data: JSON.stringify({ RoleId: req })
//   };

//   return this.apiConfigService.post<Page[]>(`${this.pagesEndpoint}/GetAssignedPages`, requestPayload);
// }

getAssignedPagesForRole(roleId: number): Observable<Page[]> {
  const requestPayload: BaseRequestHeader = {
    userId: 0,
    languageCode: 'en',
    data: JSON.stringify({ RoleId: roleId })
  };

  return this.apiConfigService.post<Page[]>(`${this.pagesEndpoint}/GetAssignedPages`, requestPayload);
}


getAssignedRoles(userId: number): Observable<{ success: boolean; result: Roles; responseMessage?: string }> {
  const requestPayload: BaseRequestHeader = {
    userId: userId,
    languageCode: 'en',
    data: JSON.stringify({ UserId: userId })
  };

  return this.apiConfigService.post<{ success: boolean; result: Roles; responseMessage?: string }>(
    `${this.usersEndpoint}/GetAssignedRole`,
    requestPayload
  );
}



}