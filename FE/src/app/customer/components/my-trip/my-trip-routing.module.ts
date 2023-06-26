import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTripComponent } from './my-trip.component';

const routes: Routes = [{ path: '', component: MyTripComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTripRoutingModule { }
