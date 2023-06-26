import { CarDetailModule } from './../car/car-detail/car-detail.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { SearchResultRoutingModule } from './search-result-routing.module';
import { SearchResultComponent } from './search-result.component';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { LoadingDotsComponent } from './loading-dots/loading-dots.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';


@NgModule({
  declarations: [
    SearchResultComponent,
    LoadingDotsComponent
  ],
  imports: [
    CommonModule,
    SearchResultRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    CarDetailModule,
    I18NextModule
  ],
  providers: [
    CarOwnerService,
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class SearchResultModule { }
