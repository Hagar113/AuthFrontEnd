import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private translate:TranslateService) { }

  ngOnInit(): void {
    this.currentLang = localStorage.getItem('currentLang') || 'en';
    this.ChangLang(this.currentLang);
  }
  currentLang: string = '';
  ChangLang(language: string) {
    this.translate.use(language);
  }
}
