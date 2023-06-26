import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-Self-driving',
  templateUrl: './car-Self-driving.component.html',
  styleUrls: ['./car-Self-driving.component.scss']
})
export class CarSelfDrivingComponent {
  constructor(private router: ActivatedRoute,){
  }
}
