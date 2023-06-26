import { Component, Input, OnInit } from '@angular/core';
import { RentalCarResponse } from 'src/app/models/response/model';
export interface PurchaseOrderOverview{
  ownerName: string,
  carName: string,
  typeOfCar: string,
  mode: string,
  unitPrice: number,
  start: {
    startTime: string
    startDate: string
  }
  end: {
    endTime: string
    endDate: string
  },
  status: string,
  statusMessage: string,
  totalPayment: number
}
@Component({
  selector: 'app-trip-order-overview',
  templateUrl: './trip-order-overview.component.html',
  styleUrls: ['./trip-order-overview.component.scss']
})
export class TripOrderOverviewComponent implements OnInit {
  @Input()
  rentalCar!: RentalCarResponse
  ngOnInit(): void {
    let {car} = this.rentalCar
  }

}
