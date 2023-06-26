import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLoginDialogComponent } from './components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { ForgetPasswordComponent } from './components/dialogs/forget-password/forget-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { CustomerRoutingModule } from '../../customer-routing.module';
import { OtpValidationComponent } from './components/otp-validation/otp-validation.component';
import { ChangePasswordDialogComponent } from './components/dialogs/change-password-dialog/change-password-dialog.component';

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    CustomerLoginDialogComponent,
    SignUpComponent,
    OtpValidationComponent,
    ChangePasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    RouterModule,
    SvgAsTemplateModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ForgetPasswordComponent,
    CustomerLoginDialogComponent,
    SignUpComponent,
    OtpValidationComponent,
    ChangePasswordDialogComponent,
  ],
})
export class AuthModule {}
