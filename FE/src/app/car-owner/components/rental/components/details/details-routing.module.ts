import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalDetailsComponent } from './details.component';

const routes: Routes = [
  {
    path: ':id', component: RentalDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentalDetailsRoutingModule { }
