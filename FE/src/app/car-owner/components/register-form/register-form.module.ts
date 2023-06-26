import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CarOwnerService } from '../../services/car-owner.service';
import { UploadFileService } from '../../services/upload-file.service';
import { RedirectDialogComponent } from './redirect-dialog/redirect-dialog.component';
import { RegisterFormComponent } from './register-form.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

const routes: Routes = [
  {
    path: '', component: RegisterFormComponent
  }
];


@NgModule({
  declarations: [
    RegisterFormComponent,
    RedirectDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    RouterModule.forChild(routes),
    I18NextModule
  ],
  providers: [
    CarOwnerService,
    UploadFileService,
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class RegisterFormModule { }
