import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';

import { TableModule } from 'ngx-easy-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EasyTableComponent } from './sharedComponent/easy-table/easy-table.component';

@NgModule({
  declarations: [

  
    
  
    EasyTableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
