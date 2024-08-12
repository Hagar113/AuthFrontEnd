import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
 
import { Router } from '@angular/router';
import { AuthServiceService } from '../Auth Service/auth-service.service';
import { Page } from 'src/app/pages/lookup/models/pages/page-response';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const allowedPages: Page[] = JSON.parse(localStorage.getItem('userPages') || '[]');
    const requestedPath = state.url.replace(/^\//, '');

    console.log('Requested Path:', requestedPath);
    console.log('Allowed Pages:', allowedPages);

    const hasAccess = allowedPages.some((page: Page) => page.pagePath === requestedPath);

    if (hasAccess) {
      return true;
    } else {
      this.router.navigate(['/pages/lookup/error404']);
      return false;
    }
  }
//  canActivate(): boolean {
 // const allowedPages: Page[] = JSON.parse(localStorage.getItem('allowedPages') || '[]');
 // const requestedPath = this.router.url;

 // console.log('Requested Path:', requestedPath);
 // console.log('Allowed Pages:', allowedPages);

  // const hasAccess = allowedPages.some((page: Page) => page.pagePath === requestedPath);

  // console.log('Access Check Result:', hasAccess);

  // if (hasAccess) {
  //   return true;
  // } else {
   // this.router.navigate(['/pages/lookup/erorr404']);
   // return false;
 // }
//}
}
