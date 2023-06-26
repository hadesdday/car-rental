import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { MyFavsComponent } from './components/my-favs/my-favs.component';
import { SignUpComponent } from './components/auth/components/sign-up/sign-up.component';
import { CustomerComponent } from './customer.component';
import { OtpValidationComponent } from './components/auth/components/otp-validation/otp-validation.component';
import { PageNotFoundComponent } from '../shared/layout/error/components/page-not-found/page-not-found.component';
import { AuthGuard } from '../helper/auth.guard';
import { I18NEXT_NAMESPACE_RESOLVER } from 'angular-i18next';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
        resolve: {
          i18next: I18NEXT_NAMESPACE_RESOLVER
        }
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'car',
        loadChildren: () =>
          import('./components/car/car.module').then((m) => m.CarModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'validate-otp/:type',
        component: OtpValidationComponent,
      },
      {
        path: 'promo',
        loadChildren: () =>
          import('./components/promo/promo.module').then((m) => m.PromoModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./components/account/account.module').then(
            (m) => m.AccountModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'my-trip',
        loadChildren: () =>
          import('./components/my-trip/my-trip.module').then(
            (m) => m.MyTripModule
          ),
      },
      {
        path: 'find',
        loadChildren: () =>
          import('./components/search-result/search-result.module').then(
            (m) => m.SearchResultModule
          ),
      },
      {
        path: 'my-favs',
        loadChildren: () =>
          import('./components/my-favs/my-favs.module').then(
            (m) => m.MyFavsModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./components/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      { path: 'page-not-found', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CustomerRoutingModule { }
