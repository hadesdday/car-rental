import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFavsComponent } from './my-favs.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { Route, RouterModule, Routes } from '@angular/router';
import { MaterialAngularModule } from 'src/app/material-angular/material-angular.module';


const routes: Routes = [
  {
    path: '', component: MyFavsComponent
  }
]
@NgModule({
  declarations: [
    MyFavsComponent,
    CarCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SvgAsTemplateModule,
    MaterialAngularModule
  ]
})
export class MyFavsModule { }
