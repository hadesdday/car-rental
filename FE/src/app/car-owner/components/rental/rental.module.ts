import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./components/listing/rental-listing.module').then(m => m.RentalListingModule)
  },
  {
    path: "details", loadChildren: () => import('./components/details/details.module').then(m => m.RentalDetailsModule)
  },
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class RentalModule { }
