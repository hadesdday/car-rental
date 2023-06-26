import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageResponse } from 'src/app/models/response/model';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent {
  @Input()
  images$!: Observable<ImageResponse[]>
  isFavoriteCar: boolean = false
  activeDot!: any
  unActiveDot!:any
  @ViewChild("coverCarousel")
  coverCarousel!: CarouselComponent
  sltDot(idx: number){
    this.coverCarousel.processDots(idx)
  }
}
