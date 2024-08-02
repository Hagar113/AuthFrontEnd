import { Component, OnInit } from '@angular/core';
import { TranslateModule,TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 // currentLanguage = 'English'; 

  constructor(private translate:TranslateService ) { 
    this.translate.setDefaultLang('en')
  }

  ngOnInit(): void {
    
  }

  // setLanguage(lang: string) {
  //   if (lang === 'en') {
  //     this.currentLanguage = 'English';
    
  //   } else if (lang === 'ar') {
  //     this.currentLanguage = 'Arabic';
    
  //   }
    
  //   const languageLabel = document.getElementById('language-label');
  //   if (languageLabel) {
  //     languageLabel.textContent = this.currentLanguage;
  //   }
  // }
  // changeLang(lang){
  //   console.log(lang);
  // }
  // switchLanguage(language:string){
  //   this.translate.use(language);
  //   localStorage.setItem('currentLang',language);
  //   window.location.reload();
  // }
  setLanguage(language: string): void {
    this.translate.use(language);
    localStorage.setItem('currentLang',language)
    window.location.reload();
  }
  // 
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('currentLang', language);
    window.location.reload();
  }
}
