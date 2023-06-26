import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './car.component';
import { CarSelfDrivingComponent } from './car-self-driving/car-self-driving.component';
import { CarWithDriverComponent } from './car-with-driver/car-with-driver.component';


const routes: Routes = [
  {
    path: '',
    component: CarComponent,
    children: [
        { path: 'sd/:car-name/:code', component: CarSelfDrivingComponent},
        { path: 'wd/:car-name/:code', component: CarWithDriverComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRoutingModule {}
