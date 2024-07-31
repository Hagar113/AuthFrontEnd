import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { EasyTableComponent } from './shared component/easy-table/easy-table.component';


@NgModule({
  declarations: [
    EasyTableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
