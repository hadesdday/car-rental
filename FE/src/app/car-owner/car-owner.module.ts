import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CustomerLayoutModule } from '../shared/layout/customer-layout/customer-layout.module';
import { CarOwnerRoutingModule } from './car-owner-routing.module';
import { CarOwnerComponent } from './car-owner.component';
import { CalendarHeaderModule } from './components/calendar-header/calendar-header.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

@NgModule({
  declarations: [
    CarOwnerComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    CarOwnerRoutingModule,
    CustomerLayoutModule,
    CalendarHeaderModule,
    I18NextModule
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CarOwnerModule { }
