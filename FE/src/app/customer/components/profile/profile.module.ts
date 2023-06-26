import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { AccountRoutingModule } from '../account/account-routing.module';
import { ProfileQrComponent } from './dialog/profile-qr/profile-qr.component';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileQrComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MaterialAngularModule,
    SvgAsTemplateModule,
    CarouselModule,
    ProfileRoutingModule,
    QRCodeModule
  ]
})
export class ProfileModule { }
