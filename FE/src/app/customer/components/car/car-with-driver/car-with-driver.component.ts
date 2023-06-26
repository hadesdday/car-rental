import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-with-driver',
  templateUrl: './car-with-driver.component.html',
  styleUrls: ['./car-with-driver.component.scss']
})
export class CarWithDriverComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router){
    
  }
}
