import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarComponent } from './car.component';
import { CarRoutingModule } from './car-routing.module';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarDetailModule } from './car-detail/car-detail.module';
import { CarWithDriverComponent } from './car-with-driver/car-with-driver.component';
import { CarSelfDrivingComponent } from './car-self-driving/car-self-driving.component';



@NgModule({
  declarations: [
    CarComponent,
    CarWithDriverComponent,
    CarSelfDrivingComponent
  ],
  imports: [
    CommonModule,
    CarRoutingModule,
    CarDetailModule,
    CarDetailModule
  ]
})
export class CarModule { }
