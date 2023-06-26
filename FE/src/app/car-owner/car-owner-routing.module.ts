import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helper/auth.guard';
import { CarOwnerComponent } from './car-owner.component';

const routes: Routes = [
  {
    path: '', component: CarOwnerComponent, children: [
      {
        path: 'register', loadChildren: () => import('./components/car-register/car-register.module').then(m => m.CarRegisterModule)
      },
      {
        path: 'register/Self-drive', loadChildren: () => import('./components/register-form/register-form.module').then(m => m.RegisterFormModule)
      },
      {
        path: 'car-listing', loadChildren: () => import('./components/car-listing/car-listing.module').then(m => m.CarListingModule)
      },
      {
        path: 'calendars', loadChildren: () => import('./components/calendars/calendars.module').then(m => m.CalendarsModule)
      },
      {
        path: 'contract', loadChildren: () => import('./components/contract/contract.module').then(m => m.ContractModule)
      },
      {
        path: 'statistics', loadChildren: () => import('./components/statistics/statistics.module').then(m => m.StatisticsModule)
      },
      {
        path: "rental-listing", loadChildren: () => import('./components/rental/rental.module').then(m => m.RentalModule)
      }
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarOwnerRoutingModule { }
