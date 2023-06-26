import { Component, Input } from '@angular/core';
import { CarResponse } from 'src/app/models/response/model';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
    @Input()
    car!: CarResponse
}
