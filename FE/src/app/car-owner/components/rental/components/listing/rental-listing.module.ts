import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RentalListingComponent } from './rental-listing.component';

const routes: Routes = [
  {
    path: '', component: RentalListingComponent,
  }
];


@NgModule({
  declarations: [
    RentalListingComponent
  ],
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
export class RentalListingModule { }
