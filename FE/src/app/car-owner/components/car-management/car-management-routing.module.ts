import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarManagementComponent } from './car-management.component';

const routes: Routes = [{ path: '', component: CarManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarManagementRoutingModule { }
