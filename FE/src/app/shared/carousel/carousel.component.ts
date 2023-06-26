import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { Observable, first, last, of } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('imageCarouselList')
  list!: ElementRef<any>;
  @ViewChild('carouselArrowPrev')
  carouselArrowPrev!: ElementRef<any>;
  @ViewChild('carouselArrowNext')
  carouselArrowNext!: ElementRef<any>;
  @Input()
  isPerItemInStep!: boolean;
  @Input()
  specItems!: any[];
  @Input()
  itemRender!: TemplateRef<any>;
  @Input()
  dotRender!: TemplateRef<any>;
  timer!: number;
  carouselIntervalId!: any;
  currentIdx: number = 0;
  totalItem!: number;
  listWidth!: number;
  itemWidth!: number;
  remainderItemWidth: number = 0;
  itemsOfPart!: number;
  step: number = 1;
  firstIdx!: number;
  lastIdx!: number;
  positionX!: number;
  remainderItems!: number;
  lastBlockIdx!: number;
  @Input()
  isActiveControl: boolean = true;
  @Input()
  isActiveDots: boolean = false;
  dotsView: number[] = [];
  @Input()
  isAutoActive: boolean = false;
  @Input()
  initTranslateItemPercent: 100 | -100 | 50 | -50 | 0 = 0;
  initTranslatePercent!: number;
  @Input()
  list$!: Observable<any[]>;
  constructor(private ref: ChangeDetectorRef, private render: Renderer2) {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (this.list$) {
      this.list$.subscribe((v) => {
        this.listWidth = this.list.nativeElement.offsetWidth;
        this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
        this.itemsOfPart = this.listWidth / this.itemWidth;
        let itemWidthPercent = 100 / this.itemsOfPart;
        this.positionX = -this.currentIdx * itemWidthPercent;
        this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
        this.specItems = v;
        let specLength = this.specItems.length;
        /* 
            Process duplicate items of spectItems
          */
        let preDuplicateItems = [...this.specItems].splice(
          specLength - this.itemsOfPart,
          specLength
        );

        let lastDuplicateItems = [...this.specItems].splice(
          0,
          this.itemsOfPart
        );
        this.specItems.unshift(...preDuplicateItems);
        this.specItems.push(...lastDuplicateItems);

        this.firstIdx = this.itemsOfPart;
        this.lastIdx = this.firstIdx + specLength - 1;
        this.step = this.isPerItemInStep === true ? 1 : this.itemsOfPart;
        this.currentIdx = this.firstIdx;
        this.lastBlockIdx = this.lastIdx - this.step + 1;
        this.remainderItems = !this.isPerItemInStep
          ? this.specItems.length % this.itemsOfPart
          : 0;
        this.remainderItemWidth =
          this.itemWidth * (this.specItems.length % this.itemsOfPart);
        let blockNumber = Math.floor(specLength / this.step);
        let dotsLength =
          this.remainderItems > 0 ? blockNumber + 1 : blockNumber;
        for (let index = 0; index < dotsLength; index++) {
          if (index === dotsLength - 1) {
            this.dotsView.push(this.lastBlockIdx);
          } else {
            this.dotsView.push(index * this.step + this.itemsOfPart);
          }
        }
        this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
        this.initTranslatePercent =
          (this.initTranslateItemPercent * (100 / this.itemsOfPart)) / 100;
        this.list.nativeElement.style.transform = `translateX(${
          this.positionX - this.initTranslatePercent
        }%)`;
        if (this.isAutoActive) {
          setInterval(() => {
            this.processCarousel(this.currentIdx + this.step);
          }, 5000);
        }
        console.log(this.specItems);

        this.ref.detectChanges();
      });
    } else {
      this.listWidth = this.list.nativeElement.offsetWidth;
      this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
      this.itemsOfPart = this.listWidth / this.itemWidth;
      let itemWidthPercent = 100 / this.itemsOfPart;
      this.positionX = -this.currentIdx * itemWidthPercent;
      this.list.nativeElement.style.transform = `translateX(${this.positionX}%)`;
      let specLength = this.specItems.length;
      /* 
          Process duplicate items of spectItems
        */
      let preDuplicateItems = [...this.specItems].splice(
        specLength - this.itemsOfPart,
        specLength
      );

      let lastDuplicateItems = [...this.specItems].splice(0, this.itemsOfPart);
      this.specItems.unshift(...preDuplicateItems);
      this.specItems.push(...lastDuplicateItems);

      this.firstIdx = this.itemsOfPart;
      this.lastIdx = this.firstIdx + specLength - 1;
      this.step = this.isPerItemInStep === true ? 1 : this.itemsOfPart;
      this.currentIdx = this.firstIdx;
      this.lastBlockIdx = this.lastIdx - this.step + 1;
      this.remainderItems = !this.isPerItemInStep
        ? this.specItems.length % this.itemsOfPart
        : 0;
      this.remainderItemWidth =
        this.itemWidth * (this.specItems.length % this.itemsOfPart);
      let blockNumber = Math.floor(specLength / this.step);
      let dotsLength = this.remainderItems > 0 ? blockNumber + 1 : blockNumber;
      for (let index = 0; index < dotsLength; index++) {
        if (index === dotsLength - 1) {
          this.dotsView.push(this.lastBlockIdx);
        } else {
          this.dotsView.push(index * this.step + this.itemsOfPart);
        }
      }
      this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
      this.initTranslatePercent =
        (this.initTranslateItemPercent * (100 / this.itemsOfPart)) / 100;
      this.list.nativeElement.style.transform = `translateX(${
        this.positionX - this.initTranslatePercent
      }%)`;
      if (this.isAutoActive) {
        setInterval(() => {
          this.processCarousel(this.currentIdx + this.step);
        }, 5000);
      }
      console.log(this.specItems);

      this.ref.detectChanges();
    }
  }
  processCarousel(passedIdx: number) {
    this.currentIdx = passedIdx;
    let isAuto = false;
    if (this.carouselIntervalId) {
      clearInterval(this.carouselIntervalId);
      isAuto = true;
    }
    if (
      this.firstIdx + this.remainderItems === this.currentIdx + this.step &&
      !this.isPerItemInStep
    ) {
      this.currentIdx = this.firstIdx;
    }
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.list.nativeElement.style.transitionDuration = `500ms`;
    let lastBlockIdx = this.lastIdx - this.step + 1;
    this.currentIdx =
      this.currentIdx >= lastBlockIdx && this.currentIdx <= this.lastIdx
        ? lastBlockIdx
        : this.currentIdx > this.lastIdx
        ? this.lastIdx + 1
        : this.currentIdx < this.firstIdx
        ? this.firstIdx - this.step
        : this.currentIdx;
    this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
    this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
    this.list.nativeElement.style.transform = `translateX(${
      this.positionX - this.initTranslatePercent
    }%)`;
    this.render.addClass(
      this.carouselArrowNext.nativeElement,
      'carousel-arrow--prevent'
    );
    this.render.addClass(
      this.carouselArrowPrev.nativeElement,
      'carousel-arrow--prevent'
    );
    setTimeout(() => {
      this.currentIdx =
        this.currentIdx === this.lastIdx + 1
          ? this.firstIdx
          : this.currentIdx < this.firstIdx
          ? lastBlockIdx
          : this.currentIdx;
      this.positionX = -(this.currentIdx * (100 / this.itemsOfPart));
      this.list.nativeElement.style.transitionDuration = `0ms`;
      this.positionX = -this.currentIdx * (100 / this.itemsOfPart);
      this.list.nativeElement.style.transform = `translateX(${
        this.positionX - this.initTranslatePercent
      }%)`;
      this.render.removeClass(
        this.carouselArrowNext.nativeElement,
        'carousel-arrow--prevent'
      );
      this.render.removeClass(
        this.carouselArrowPrev.nativeElement,
        'carousel-arrow--prevent'
      );
    }, 500);
    if (isAuto) {
      this.carouselIntervalId = setInterval(() => {
        this.currentIdx++;
        this.processCarousel(this.currentIdx);
      }, this.timer);
    }
  }

  /*
    Description: Method re-get width and height of list and first item (same each item in list)
    after user resize web
    - compute truth width = length of number of item
    - check remainder
    - compute part number of carousel
    */
  recomputeResponsive() {
    this.currentIdx = this.firstIdx;
    this.listWidth = this.list.nativeElement.offsetWidth;
    this.itemWidth = this.list.nativeElement.firstChild.offsetWidth;
    this.itemsOfPart = this.listWidth / this.itemWidth;

    this.step = this.isPerItemInStep === true ? 1 : this.itemsOfPart;
    this.remainderItems = !this.isPerItemInStep
      ? this.specItems.length % this.itemsOfPart
      : 0;
    this.remainderItemWidth =
      this.itemWidth * (this.specItems.length % this.itemsOfPart);
    let specLength = this.specItems.length;
    let blockNumber = Math.floor(specLength / this.step);
    let dotsLength = this.remainderItems > 0 ? blockNumber + 1 : blockNumber;
    this.dotsView = new Array(dotsLength).fill(0);
  }
  preCarousel($event: MouseEvent) {
    $event.preventDefault();
    this.processCarousel(this.currentIdx - this.step);
  }
  nextCarousel($event: MouseEvent) {
    $event.preventDefault();
    this.processCarousel(this.currentIdx + this.step);
  }
  processDots(idx: number) {
    this.processCarousel(idx);
  }
}
