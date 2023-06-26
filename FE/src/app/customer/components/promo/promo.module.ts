import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoRoutingModule } from './promo-routing.module';
import { PromoComponent } from './promo.component';
import { PromoDetailComponent } from './dialog/promo-detail/promo-detail.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';


@NgModule({
  declarations: [
    PromoComponent,
    PromoDetailComponent
  ],
  imports: [
    CommonModule,
    PromoRoutingModule,
    MaterialAngularModule
  ]
})
export class PromoModule { }
