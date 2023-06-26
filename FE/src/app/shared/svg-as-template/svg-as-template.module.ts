import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WheelSvgComponent } from './wheel-svg/wheel-svg.component';
import { CertificateSvgComponent } from './certificate-svg/certificate-svg.component';



@NgModule({
  declarations: [
    WheelSvgComponent,
    CertificateSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WheelSvgComponent,
    CertificateSvgComponent
  ]
})
export class SvgAsTemplateModule { }
