import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { CustomRouteReuseStrategy } from './customer/custom-route-reuse-strategy';
import { PageNotFoundComponent } from './shared/layout/error/components/page-not-found/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
        providers: [
          {
            provide: RouteReuseStrategy,
            useClass: CustomRouteReuseStrategy,
          },
        ],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'car-owner',
        loadChildren: () =>
          import('./car-owner/car-owner.module').then((m) => m.CarOwnerModule),
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
