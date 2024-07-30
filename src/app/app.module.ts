import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { LookupRoutingModule } from './pages/lookup/lookup-routing.module';
import { LookupModule } from './pages/lookup/lookup.module';
@NgModule({
  declarations: [
    AppComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule ,
    HttpClientModule,
    ReactiveFormsModule,
    LookupRoutingModule ,
    LookupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
