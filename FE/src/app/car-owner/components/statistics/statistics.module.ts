import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CarOwnerService } from '../../services/car-owner.service';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

const routes: Routes = [
  {
    path: '', component: StatisticsComponent
  }
];

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    I18NextModule
  ],
  providers: [
    CarOwnerService,
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class StatisticsModule { }
