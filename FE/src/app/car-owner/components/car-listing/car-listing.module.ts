import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { CarListingComponent } from './car-listing.component';
import { CarItemComponent } from './car-item/car-item.component';


const routes: Routes = [
  {
    path: '', component: CarListingComponent
  },
  {
    path: ':id', loadChildren: () => import("../car-management/car-management.module").then(m => m.CarManagementModule)
  }
];


@NgModule({
  declarations: [
    CarListingComponent,
    CarItemComponent
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
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CarListingModule { }
