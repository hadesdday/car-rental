import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';

@Component({
  selector: 'app-prominent-place',
  templateUrl: './prominent-place.component.html',
  styleUrls: ['./prominent-place.component.scss'],
})
export class ProminentPlaceComponent {
  @Input()
  primaryClr!: string;
  @Input()
  secondaryClr!: string;
  @Input()
  tertiaryClr!: string;
  activeDot!: any
  unActiveDot!:any
  categories: number[] = [1,2,3,4,5,6,7,8];
  categories1: number[] = [1,2,3,4,5,6,7,8, 9, 10, 11,12,13,14,15,16, 17];
  @ViewChild('airPortCarousel')
  airPortCarousel!: CarouselComponent
  
  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }
  ngAfterViewInit(){
      this.activeDot = {
        backgroundColor: this.primaryClr,
        border: `2px solid ${this.secondaryClr}`,
      };
      this.unActiveDot = {
        backgroundColor: this.primaryClr,
        opacity: 0.2,
      };
      this.changeDetectorRef.detectChanges()
  }
  setDestinationSltBgClr(): string {
    return `linear-gradient(180deg,#fff 0,#fff 54%,${this.tertiaryClr} 0,${this.tertiaryClr})`;
  }
  setImageBefore(): string {
    return `linear-gradient(transparent,${this.primaryClr})`;
  }
  sltDot(idx: number){
    this.airPortCarousel.processDots(idx)
  }
}
