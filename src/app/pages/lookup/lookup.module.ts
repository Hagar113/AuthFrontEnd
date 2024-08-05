import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LookupRoutingModule } from './lookup-routing.module';
import { ViewComponent } from './screens/roles/view/view.component';
import { FormComponent } from './screens/roles/form/form.component';
import { SubjectViewComponent } from './screens/subject/subject-view/subject-view.component';
import { SubjectFormComponent } from './screens/subject/subject-form/subject-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './screens/home/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { PagesViewComponent } from './screens/pages/pages-view/pages-view.component';
import { PagesFormComponent } from './screens/pages/pages-form/pages-form.component';

@NgModule({
  declarations: [
    ViewComponent,
    FormComponent,
    SubjectViewComponent,
    SubjectFormComponent,
    HomeComponent,
    PagesViewComponent,
    PagesFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LookupRoutingModule,
    FormsModule,
    TranslateModule,
    SharedModule,
  ],
})
export class LookupModule {}
