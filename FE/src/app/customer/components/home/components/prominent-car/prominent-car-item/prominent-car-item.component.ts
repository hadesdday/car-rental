import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarDetailComponent } from 'src/app/customer/components/car/car-detail/car-detail.component';
import { CAR_IMG } from 'src/app/models/constance';
import { CarResponse, ImageResponse } from 'src/app/models/response/model';

@Component({
  selector: 'app-prominent-car-item',
  templateUrl: './prominent-car-item.component.html',
  styleUrls: ['./prominent-car-item.component.scss']
})
export class ProminentCarItemComponent implements OnInit{
  @Input()
  car!: CarResponse
  thumb!: ImageResponse | undefined
  constructor(private matDialog: MatDialog,){
    
  }
  ngOnInit(): void {
    
    if(this.car && this.car.images){
      this.car.images = this.car.images.map(image => {
        if(image.isThumbnail){
          this.thumb = image
        }
        return {
          ...image, imageUrl: `${CAR_IMG}${image.imageUrl}`
        }
      })
      this.thumb = this.car.images.find(image => image.isThumbnail)
    }
  }
  openCarDetailDialog(rentalMode: string, carId: number) {
    console.log(rentalMode);
    console.log(carId);
    
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
