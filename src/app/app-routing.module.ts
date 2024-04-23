import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsListComponent } from './components/admin/blog-list/blog-list.component';
import { LoginComponent } from './components/frontend/login/login.component';
import { FileComponent } from './components/admin/file/file.component';
import { IndexAdminComponent } from './components/admin/index-admin/index-admin.component';
import { Error404Component } from './components/frontend/error404/error404.component';
import { IndexComponent } from './components/frontend/index/index.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { BlogSingleComponent } from './components/frontend/blog-single/blog-single.component';

const redirectLoggedInToAdmin = () => redirectLoggedInTo([ '/admin' ]);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([ '/login' ]);

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'blog/:id',
    component: BlogSingleComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectLoggedInToAdmin }
  },
  {
    path: 'admin',
    component: IndexAdminComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminDashboardComponent,
      },
      {
        path: 'blogs',
        component: BlogsListComponent
      },
      {
        path: 'file',
        component: FileComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        component: AdminDashboardComponent
      },
    ]
  },

  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
