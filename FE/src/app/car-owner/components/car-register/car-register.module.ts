import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CarRegisterComponent } from './car-register.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

const routes: Routes = [
  {
    path: '', component: CarRegisterComponent
  }
];

@NgModule({
  declarations: [CarRegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    I18NextModule
  ],
  providers: [
    { provide: I18NEXT_NAMESPACE, useValue: [] }
  ]
})
export class CarRegisterModule { }
