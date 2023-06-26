import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentPlaceComponent } from './prominent-place.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';



@NgModule({
  declarations: [
    ProminentPlaceComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [
    ProminentPlaceComponent
  ]
})
export class ProminentPlaceModule { }
