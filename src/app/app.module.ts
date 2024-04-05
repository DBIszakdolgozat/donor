import { Error404Component } from './components/frontend/error404/error404.component'
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogDetailsComponent } from './components/admin/blog-details/blog-details.component';
import { BlogsListComponent } from './components/admin/blog-list/blog-list.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { UploadFormComponent } from './components/admin/upload-form/upload-form.component';
import { UploadListComponent } from './components/admin/upload-list/upload-list.component';
import { UploadDetailsComponent } from './components/admin/upload-details/upload-details.component';
import { FileComponent } from './components/admin/file/file.component';

import { LoginComponent } from './components/frontend/login/login.component';
import { IndexComponent } from './components/frontend/index/index.component';
import { IndexAdminComponent } from './components/admin/index-admin/index-admin.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/frontend/header/header.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    BlogDetailsComponent,
    BlogsListComponent,
    UploadFormComponent,
    UploadListComponent,
    UploadDetailsComponent,
    FileComponent,
    LoginComponent,
    IndexComponent,
    Error404Component,
    IndexAdminComponent,
    AdminDashboardComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
   NgxEditorModule,
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
