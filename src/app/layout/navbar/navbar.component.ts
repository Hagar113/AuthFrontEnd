import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from 'src/app/auth/Auth Service/auth-service.service';
import { PageDto } from 'src/app/auth/models/page-dto';
import { Router, NavigationEnd } from '@angular/router';
import { Page } from 'src/app/pages/lookup/models/pages/page-response';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pages: PageDto[] = [];
  currentLang: string = '';
  showNavbar: boolean = true;

  constructor(private translate: TranslateService, private auth: AuthServiceService, private router: Router) {
    this.currentLang = localStorage.getItem('currentLang') || 'en'; // Default to 'en' if not set
    this.translate.use(this.currentLang);

    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbarVisibility(event.url);
      }
    });
  }

  ngOnInit(): void {
    this.loadPagesFromLocalStorage();
  }

  loadPagesFromLocalStorage(): void {
    const userPagesStr = localStorage.getItem('userPages');
    if (userPagesStr) {
      try {
        const userPages: Page[] = JSON.parse(userPagesStr);
        if (Array.isArray(userPages)) {
          this.pages = userPages;
        } else {
          console.error('Pages data is missing or invalid');
        }
      } catch (error) {
        console.error('Error parsing pages data:', error);
      }
    } else {
      console.error('No pages found in local storage');
    }
  }
  
  
  updateNavbarVisibility(url: string) {
    const hideNavbarPaths = ['/auth/login', '/auth/signup'];
    this.showNavbar = !hideNavbarPaths.some(path => url.includes(path));
  }

  switchLanguage(language: string) {
    localStorage.setItem('currentLang', language);
    this.translate.use(language);
    // Optional: Reload the page to apply language changes
    window.location.reload(); 
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userPages');
    localStorage.removeItem('currentLang');
    // Optional: Redirect to login or home page
    // this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
