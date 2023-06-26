import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { is } from 'date-fns/locale';
import { CustomerLoginDialogComponent } from 'src/app/customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { UserService } from 'src/app/customer/services/user.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { UserDTO } from 'src/app/models/model';
import { BookingRequest } from 'src/app/models/request/model';
import { CarResponse } from 'src/app/models/response/model';
import { CarRentalService } from 'src/app/services/car-rental.service';
import { TimerUtilService } from 'src/app/services/timer-util.service';

@Component({
  selector: 'app-booking-confirm',
  templateUrl: './booking-confirm.component.html',
  styleUrls: ['./booking-confirm.component.scss'],
})
export class BookingConfirmComponent {
  title: string = 'Xác nhận đặt xe';
  car!: CarResponse;
  sdFormValue: any;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public timerUtilService: TimerUtilService,
    private _carRentalService: CarRentalService,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _messDialogService: MessageDialogService
  ) {
    this.car = data.car;
    this.sdFormValue = data.sdFormValue;
  }
  bookCar(){
    let startTime: number = this.sdFormValue.startDate.getTime() + this.sdFormValue.startTime
    let endTime: number = this.sdFormValue.endDate.getTime() + this.sdFormValue.endTime
    let curUser: UserDTO | null = this._userService.userValue
    if(curUser){
      let bookingRequest: BookingRequest = {
        startTime,
        endTime, 
        'userId': curUser.id,
        'carId': this.car.id,
        'promoId': this.sdFormValue.promoId
      }
      this._carRentalService.bookCar(bookingRequest).subscribe(isSucc => {
        if(isSucc){
          let dataDialog = {
            title: 'Thành công',
            message: "Quý khách đã đặt xe thành công! Vui lòng đợi chủ xe xác nhận",
            navigatePages: ['home'],
          };
          this._messDialogService.openMessageDialog(MessageDialogComponent, dataDialog)
        }
      })
    }else{
      this._matDialog.open(CustomerLoginDialogComponent, {
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms'
      })
    }
  }
}
