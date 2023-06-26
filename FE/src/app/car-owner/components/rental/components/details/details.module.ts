import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';
import { RentalDetailsRoutingModule } from './details-routing.module';
import { RentalDetailsComponent } from './details.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';



@NgModule({
  declarations: [
    RentalDetailsComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    RentalDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialAngularModule,
    I18NextModule
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class RentalDetailsModule { }
