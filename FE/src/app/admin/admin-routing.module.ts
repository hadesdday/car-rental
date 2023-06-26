import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddNewComponent } from './components/add-new/add-new.component';
import { ListComponent } from './components/list/list.component';
import { StatisticComponent } from './components/statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'add',
        component: AddNewComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
