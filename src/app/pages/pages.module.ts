import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LookupModule } from './lookup/lookup.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule, LookupModule],
})
export class PagesModule {}
