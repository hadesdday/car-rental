import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CAR_IMG } from 'src/app/models/constance';
import { CarResponse } from 'src/app/models/response/model';
import { CarService } from 'src/app/services/car.service';
import { CarDetailComponent } from '../../../car/car-detail/car-detail.component';

@Component({
  selector: 'app-prominent-car',
  templateUrl: './prominent-car.component.html',
  styleUrls: ['./prominent-car.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProminentCarComponent {
  categories: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  cars$!: Observable<CarResponse[]>
  constructor(private router: Router, private _carService: CarService,  private matDialog: MatDialog,){
    this.cars$ = this._carService.findFeaturesCars(1)
  }
  navigateCarDetail(){
    const navigationExtras: NavigationExtras = {
      state: {
        routeBy: 'bar'
      }
    }
    this.router.navigate(['car/huy/123'], navigationExtras);
  }
  openCarDetailDialog(rentalMode: string, carId: number) {
    this.matDialog.open(CarDetailComponent, {
      data: {
        rentalMode: rentalMode,
        carId: carId
      },
      panelClass: 'mat-dialog-bg',
      backdropClass: 'my-back-drop',
      height: '100vh'
    })
  }
}
