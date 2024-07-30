import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LookupRoutingModule } from './lookup-routing.module';
import { ViewComponent } from './screens/roles/view/view.component';
import { FormComponent } from './screens/roles/form/form.component';
import { SubjectViewComponent } from './screens/subject/subject-view/subject-view.component';
import { SubjectFormComponent } from './screens/subject/subject-form/subject-form.component';



@NgModule({
  declarations: [
    ViewComponent,
    FormComponent,
    
    SubjectViewComponent,
    SubjectFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LookupRoutingModule
    
  ]
})
export class LookupModule { }
