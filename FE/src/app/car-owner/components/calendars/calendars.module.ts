import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarsComponent } from './calendars.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CalendarHeaderModule } from '../calendar-header/calendar-header.module';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

const routes: Routes = [
  {
    path: '', component: CalendarsComponent
  }
];

@NgModule({
  declarations: [CalendarsComponent],
  imports: [
    CommonModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot(),
    CalendarHeaderModule,
    RouterModule.forChild(routes),
    I18NextModule
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CalendarsModule { }
