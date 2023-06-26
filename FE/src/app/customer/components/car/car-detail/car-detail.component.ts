import { log } from 'console';
import { SD_MODE, WD_MODE } from './../../../../models/constance';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  RentalHourOption,
  TimerUtilService,
} from 'src/app/services/timer-util.service';
import { DeliveryLocationEditComponent } from './dialog/delivery-location-edit/delivery-location-edit.component';
import { PromoEditComponent } from './dialog/promo-edit/promo-edit.component';
import { BookingConfirmComponent } from './dialog/booking-confirm/booking-confirm.component';
import { Location } from '@angular/common';
import { RouteCatchService } from 'src/app/customer/route-catch.service';
import { CarDTO, UserDTO } from 'src/app/models/model';
import { Observable, map, of, switchAll, switchMap } from 'rxjs';
import { CarService } from 'src/app/services/car.service';
import { CarResponse } from 'src/app/models/response/model';
import { UserService } from 'src/app/customer/services/user.service';
import { CustomerLoginDialogComponent } from '../../auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { FavCarService } from 'src/app/services/fav-car.service';
@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
})
export class CarDetailComponent implements OnInit, AfterViewInit {
  @Input()
  car$!: Observable<CarResponse>;
  @Input()
  rentalMode!: 'sd' | 'wd';
  formType!: 'sd' | 'wd';
  isFavoriteCar: boolean = false;
  startAndReturnHrOptions: any;
  rentalHrOptions!: RentalHourOption[];
  sdFormGroup!: FormGroup;
  /*  */
  carBookingFG!: FormGroup;
  curDate = new Date();
  initStartDate!: Date;
  initEndDate!: Date;
  initStartTime!: number;
  initEndTime!: number;
  get startDateControl() {
    return this.sdFormGroup.get('startDate');
  }
  get endDateControl() {
    return this.sdFormGroup.get('endDate');
  }
  get startTimeControl() {
    return this.sdFormGroup.get('startTime');
  }
  get endtimeControl() {
    return this.sdFormGroup.get('endTime');
  }
  constructor(
    public timerUtilService: TimerUtilService,
    private matDialog: MatDialog,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private routeCatchService: RouteCatchService,
    private route: ActivatedRoute,
    private _userSerivice: UserService,
    private _favCarService: FavCarService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarService
  ) {
    this.startAndReturnHrOptions = timerUtilService.startAndReturnHrOptions;

    this.carBookingFG = this._fb.group({
      pickUpDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      pickUpTime: ['', Validators.required],
      returnTime: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
    });
    /* int FormGroup */
    this.reformatDate();
    this.sdFormGroup = this._fb.group({
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      promoId: [''],
    });
  }
  ngAfterViewInit(): void {
    if (this.rentalMode) {
      this.formType = this.data.rentalMode;
    }
    if (this.data && this.data.rentalMode) {
      this.formType = this.data.rentalMode === 'SD' ? 'sd' : 'wd';
    }
    /* int FormGroup */
    const path = this.location.path(); //get url path
    if (path.startsWith('/find')) {
      const params = path.split('/find/filter?')[1]; //get all param
      const splitted = params.split('&'); //split param into array ex:['startDate=1','endDate=2']
      if (splitted.length > 5) {
        //wd intermunicipal
      } else if (splitted.length === 5) {
        //wd urban
      } else {
        this.startDate = new Date(Number(splitted[0].split('=')[1])); //get startDate value
        this.endDate = new Date(Number(splitted[1].split('=')[1])); //get endDate value
        this.address = splitted[2].split('=')[1]; //get address value
        this.sdFormGroup.patchValue({
          startDate: new Date(this.startDate),
          startTime:
            new Date(this.startDate).getHours() * 60 * 60 * 1000 +
            new Date(this.startDate).getMinutes() * 60 * 1000, //get hour and minute in milliseconds
          endDate: new Date(this.endDate),
          endTime:
            new Date(this.endDate).getHours() * 60 * 60 * 1000 +
            new Date(this.endDate).getMinutes() * 60 * 1000, //get hour and minute in milliseconds
        });
      }
    } else {
      this.sdFormGroup.patchValue({
        startDate: new Date(),
        startTime: 0,
        endDate:   new Date(),
        endTime:   0,
      });
    }
  }
  startDate!: Date;
  endDate!: Date;
  address!: string;
  savedScrollPosition!: any;
  ngOnInit(): void {
    let curUser: UserDTO | null = this._userSerivice.userValue;
    let userId: number | null = curUser ? curUser.id : null;
    this.car$ = this.sdFormGroup.valueChanges.pipe(
      switchMap((value) => {
        return this.carService.findOne(
          this.data.carId,
          userId,
          value.startDate.getTime() + value.startTime,
          value.endDate.getTime() + value.endTime,
          value.promoId
        );
      })
    );

    this.savedScrollPosition = document.documentElement.scrollTop;
  }
  editDeliveryLocation(title: string, car: CarResponse) {
    this.matDialog.open(DeliveryLocationEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        car: car,
      },
    });
  }
  editPromo() {
    let diaRef = this.matDialog.open(PromoEditComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    diaRef.afterClosed().subscribe((value) => {
      this.sdFormGroup.patchValue({ promoId: value.data.promoId });
    });
  }
  confirmBooking(car: CarResponse) {
    this.matDialog.open(BookingConfirmComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      width: '80%',
      height: '100vh',
      data: {
        car: car,
        sdFormValue: this.sdFormGroup.value,
      },
    });
  }
  onClose() {
    const navigationExtras: NavigationExtras = {
      skipLocationChange: true,
    };
    this.router.navigate(['/find/filter'], navigationExtras);
  }
  updateFavCar(type: '-' | '+') {
    let curUser: UserDTO | null = this._userSerivice.userValue;
    if (!curUser) {
      this.matDialog.open(CustomerLoginDialogComponent, {
        enterAnimationDuration: '500',
        exitAnimationDuration: '500',
      });
    } else {
      if (type === '+') {
        this._favCarService
          .addFavCar(this.data.carId, curUser.id)
          .subscribe((isAdd) => {
            if (isAdd) {
              alert('Đã thêm vào danh sách yêu thích');
            } else {
              alert('Thêm thất bại');
            }
            this.car$ = this.car$.pipe(
              map((car) => {
                let updateCar: CarResponse = {
                  ...car,
                  isFav: true,
                };
                return updateCar;
              })
            );
          });
      } else {
        this._favCarService
          .removeFavCar(this.data.carId, curUser.id)
          .subscribe((isRemove) => {
            if (isRemove) {
              alert('Đã huỷ bỏ yêu thích');
            } else {
              alert('Huỷ thất bại');
            }
            this.car$ = this.car$.pipe(
              map((car) => {
                let updateCar: CarResponse = {
                  ...car,
                  isFav: false,
                };
                return updateCar;
              })
            );
          });
      }
    }
  }
  private reformatDate() {
    this.initStartDate = new Date();
    this.initStartDate.setHours(0, 0, 0, 0);
    this.initEndDate = new Date();
    this.initEndDate.setDate(this.initStartDate.getDate() + 1);
    this.initEndDate.setHours(0, 0, 0, 0);
    this.initStartTime = 0;
    this.initEndTime = 0;
  }
}
