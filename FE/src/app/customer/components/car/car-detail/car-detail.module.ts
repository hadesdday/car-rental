import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarDetailComponent } from './car-detail.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';
import { MyLocationComponent } from './dialog/my-location/my-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PromoEditComponent } from './dialog/promo-edit/promo-edit.component';
import { BookingConfirmComponent } from './dialog/booking-confirm/booking-confirm.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';
import { ModuleDealComponent } from './module-deal/module-deal.component';
import { CoverComponent } from './cover/cover.component';
import { CustomerRoutingModule } from 'src/app/customer/customer-routing.module';
import { RatingItemComponent } from './rating-item/rating-item.component';


@NgModule({
  declarations: [
    CarDetailComponent,
    DeliveryLocationEditComponent,
    MyLocationComponent,
    PromoEditComponent,
    BookingConfirmComponent,
    ModuleDetailComponent,
    ModuleDealComponent,
    CoverComponent,
    RatingItemComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    CustomerRoutingModule
  ],
  exports: [
    CarDetailComponent
  ],
})
export class CarDetailModule { }
