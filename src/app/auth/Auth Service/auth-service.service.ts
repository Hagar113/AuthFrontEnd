import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from 'src/app/Shared Services/api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private endpoint = 'Auth';
  constructor(private apiConfigService: ApiConfigService) { }


  login(model: any): Observable<any> {
    return this.apiConfigService.post<any>(`${this.endpoint}/Login`, model);
  }
}
