import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LookupRoutingModule } from './lookup-routing.module';
import { ViewComponent } from './screens/roles/view/view.component';
import { FormComponent } from './screens/roles/form/form.component';


@NgModule({
  declarations: [
    ViewComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    LookupRoutingModule
  ]
})
export class LookupModule { }
