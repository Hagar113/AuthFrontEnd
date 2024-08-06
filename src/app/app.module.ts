import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LookupRoutingModule } from './pages/lookup/lookup-routing.module';
import { LookupModule } from './pages/lookup/lookup.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthServiceService } from './auth/Auth Service/auth-service.service';
import { AuthGuard } from './auth/guard/auth.guard';
import { RouterModule } from '@angular/router';
//import { RouterModule } from '@angular/router';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, FooterComponent, NavbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    PagesModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [],

  providers: [AuthGuard, AuthServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
