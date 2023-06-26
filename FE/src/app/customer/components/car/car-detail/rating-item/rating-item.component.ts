import { Component, Input } from '@angular/core';
import { CarRatingDTO } from 'src/app/models/model';

@Component({
  selector: 'app-rating-item',
  templateUrl: './rating-item.component.html',
  styleUrls: ['./rating-item.component.scss']
})
export class RatingItemComponent {
  @Input()
  rating!: CarRatingDTO
}
