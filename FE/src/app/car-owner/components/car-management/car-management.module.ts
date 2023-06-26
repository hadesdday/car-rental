import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarManagementRoutingModule } from './car-management-routing.module';
import { CarManagementComponent } from './car-management.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarHeaderModule } from '../calendar-header/calendar-header.module';
import { CarOwnerService } from '../../services/car-owner.service';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';


@NgModule({
  declarations: [
    CarManagementComponent
  ],
  imports: [
    CommonModule,
    CarManagementRoutingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    CalendarHeaderModule,
    I18NextModule
  ],
  providers: [
    CarOwnerService,
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CarManagementModule { }
