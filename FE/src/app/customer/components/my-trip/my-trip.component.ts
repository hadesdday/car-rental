import { TimerUtilService } from 'src/app/services/timer-util.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PurchaseOrderOverview } from './components/trip-order-overview/trip-order-overview.component';
import { FilterComponent } from './dialog/filter/filter.component';
import { Observable } from 'rxjs';
import { UserTripResponse } from 'src/app/models/response/model';
import { CarRentalService } from 'src/app/services/car-rental.service';
import { UserService } from '../../services/user.service';
import { UserDTO } from 'src/app/models/model';

@Component({
  selector: 'app-my-trip',
  templateUrl: './my-trip.component.html',
  styleUrls: ['./my-trip.component.scss'],
})
export class MyTripComponent implements OnInit {
  isEmptyTrip: boolean = false;
  sltTabIdx: number = 0;

  userTrip$!: Observable<UserTripResponse>
  constructor(private matDialog: MatDialog, private timeUtils: TimerUtilService, private carRentalService: CarRentalService, private _userService: UserService ) {

  }
  ngOnInit(): void {
    let curUser: UserDTO = this._userService.userValue!
    this.userTrip$ = this.carRentalService.findUserTrip(curUser.id)
    this.userTrip$.subscribe(v => console.log(v))
  }
  openFilterDialog() {
    this.matDialog.open(FilterComponent, {
      data: {
        sltTabIdx: this.sltTabIdx,
      },
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
  }
}
