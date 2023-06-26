import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[inputNumberOnly]'
})
export class InputNumberOnlyDirective {
  constructor(private el: ElementRef) { }

}
