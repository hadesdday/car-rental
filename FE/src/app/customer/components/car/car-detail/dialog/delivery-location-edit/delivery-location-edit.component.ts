import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, Input } from '@angular/core';
import { MyLocationComponent } from '../my-location/my-location.component';

@Component({
  selector: 'app-delivery-location-edit',
  templateUrl: './delivery-location-edit.component.html',
  styleUrls: ['./delivery-location-edit.component.scss']
})
export class DeliveryLocationEditComponent {
  @Input()
  title!: string 
  constructor(private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any){
    console.log(data)
  }
  chooseFromMap(){
    this.matDialog.open(MyLocationComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500,s'
    })
  }
}
