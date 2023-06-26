import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProminentCarComponent } from './prominent-car.component';
import { CarouselModule } from 'src/app/shared/carousel/carousel.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { ProminentCarItemComponent } from './prominent-car-item/prominent-car-item.component';



@NgModule({
  declarations: [
    ProminentCarComponent,
    ProminentCarItemComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SvgAsTemplateModule
  ],
  exports: [
    ProminentCarComponent,
  ],
})
export class ProminentCarModule { }
