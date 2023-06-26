import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AddNewComponent } from './components/add-new/add-new.component';
import { ListComponent } from './components/list/list.component';
import { PromoListComponent } from './components/list/components/promo-list/promo-list.component';
import { PromoItemComponent } from './components/list/components/promo-list/promo-item/promo-item.component';
import { EditPromoDialogComponent } from './components/list/components/promo-list/eidt-promo-dialog/eidt-promo-dialog.component';
import { AddCarFeatureComponent } from './components/add-new/components/add-car-feature/add-car-feature.component';
import { RegisteredCarListingComponent } from './components/list/components/registered-car-listing/registered-car-listing.component';
import { EditRegisteredCarDialogComponent } from './components/list/components/registered-car-listing/edit-registered-car-dialog/edit-registered-car-dialog.component';
import { RegisteredCarService } from './services/registered-car.service';
import { StatisticComponent } from './components/statistic/statistic.component';


@NgModule({
  declarations: [
    AdminComponent,
    HeaderComponent,
    SidebarComponent,
    AddNewComponent,
    ListComponent,
    PromoListComponent,
    PromoItemComponent,
    EditPromoDialogComponent,
    AddCarFeatureComponent,
    RegisteredCarListingComponent,
    EditRegisteredCarDialogComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialAngularModule,
  ],
  providers: [
    RegisteredCarService
  ]
})
export class AdminModule { }
