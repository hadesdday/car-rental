import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { BannerComponent } from './components/banner/banner.component';
import { OwnerComponent } from './components/owner/owner.component';
import { ProminentCarModule } from './components/prominent-car/prominent-car.module';
import { ProminentPlaceModule } from './components/prominent-place/prominent-place.module';
import { PromoComponent } from './components/promo/promo.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    PromoComponent,
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    ProminentPlaceModule,
    ProminentCarModule,
    MaterialAngularModule,
    HttpClientModule,
    I18NextModule
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class HomeModule { }
