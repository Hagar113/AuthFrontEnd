import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './screens/roles/view/view.component';
import { FormComponent } from './screens/roles/form/form.component';
import { SubjectViewComponent } from './screens/subject/subject-view/subject-view.component';
import { SubjectFormComponent } from './screens/subject/subject-form/subject-form.component';
import { HomeComponent } from './screens/home/home/home.component';
import { PagesViewComponent } from './screens/pages/pages-view/pages-view.component';
import { PagesFormComponent } from './screens/pages/pages-form/pages-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'roles', component: ViewComponent },
  {path:'pages',component:PagesViewComponent},
  {path:'pageForm/:id',component:PagesFormComponent},
  // { path: 'roleForm', component:FormComponent},
  { path: 'roleForm/:id', component:FormComponent },
  { path: 'subjects', component:SubjectViewComponent },
  { path: 'subjectForm/:id', component: SubjectFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
