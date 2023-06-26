import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RouterModule } from '@angular/router';
import { CustomerLoginDialogComponent } from '../../../customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { ForgetPasswordComponent } from '../../../customer/components/auth/components/dialogs/forget-password/forget-password.component';
import { SvgAsTemplateModule } from '../../svg-as-template/svg-as-template.module';
import { WheelSvgComponent } from '../../svg-as-template/wheel-svg/wheel-svg.component';
import { CustomerRoutingModule } from 'src/app/customer/customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    RouterModule,
    SvgAsTemplateModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    I18NextModule
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CustomerLayoutModule { }
