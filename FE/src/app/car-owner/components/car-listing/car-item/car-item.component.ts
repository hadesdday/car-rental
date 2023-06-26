import { Component, Input } from '@angular/core';
import { CarResponse } from 'src/app/models/response/model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.scss']
})
export class CarItemComponent {
  @Input()
  car!: CarResponse
}
