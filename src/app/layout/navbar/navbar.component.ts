import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // currentLanguage = 'English';

  constructor(private translate: TranslateService) {
    this.currentLang = localStorage.getItem('currentLang') || '';
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {}

  currentLang: string = '';
  switchLanguage(language: string) {
    localStorage.setItem('currentLang', language);
    this.translate.use(language);
    window.location.reload();
  }
}
