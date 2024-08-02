
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/lookup/screens/home/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { 
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
 
  { 
    path: '', redirectTo: '/auth/signup', pathMatch: 'full' 
  },
  { 
    path: '**', redirectTo: '/auth/signup' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
