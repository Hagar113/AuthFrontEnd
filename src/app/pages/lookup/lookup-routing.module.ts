import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './screens/roles/view/view.component';
import { FormComponent } from './screens/roles/form/form.component';
import { SubjectViewComponent } from './screens/subject/subject-view/subject-view.component';
import { SubjectFormComponent } from './screens/subject/subject-form/subject-form.component';
import { HomeComponent } from './screens/home/home/home.component';
import { PagesViewComponent } from './screens/pages/pages-view/pages-view.component';
import { PagesFormComponent } from './screens/pages/pages-form/pages-form.component';
import { UserViewComponent } from './screens/users/user-view/user-view.component';
import { UserFormComponent } from './screens/users/user-form/user-form.component';
import { TeacherSubjectsViewComponent } from './screens/teacher-subjects-view/teacher-subjects-view.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'roles', component: ViewComponent },
  {path:'pages',component:PagesViewComponent},
  {path:'pageForm/:id',component:PagesFormComponent},
  // { path: 'roleForm', component:FormComponent},
  { path: 'roleForm/:id', component:FormComponent },
  { path: 'subjects', component:SubjectViewComponent },
  { path: 'subjectForm/:id', component: SubjectFormComponent },
  { path: 'users', component:UserViewComponent },
  { path: 'userForm/:id', component: UserFormComponent },
  { path: 'teacherSubjects', component:TeacherSubjectsViewComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LookupRoutingModule { }
