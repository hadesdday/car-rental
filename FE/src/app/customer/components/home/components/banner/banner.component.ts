import {
  AfterViewInit,
  Component, Input, OnInit, ViewEncapsulation
} from '@angular/core';
import {
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { NavigationExtras, Router } from '@angular/router';
import { format, startOfDay } from 'date-fns';
import {
  combineLatest,
  debounceTime, map,
  Observable,
  of,
  startWith,
  switchMap, timer
} from 'rxjs';
import { TimeFormat } from 'src/app/models/model';
import { RentalHourOption } from 'src/app/services/timer-util.service';
import { addDays } from 'date-fns';
export interface DriverService {
  pickUpPlace: string;
  startTime: {
    rentalDate: string;
    startHour: number;
    rentalHours: number;
  };
  endTime?: {
    rentalDate: string;
    startHour: number;
  };
  truthRentalHrs: number
}

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BannerComponent implements OnInit, AfterViewInit {
  serviceType: 'Self_DRIVING' | 'DRIVER' = 'DRIVER';
  options: string[] = [
    'Thành phố Hồ Chí Minh',
    'Hà Nội',
    'Thừa Thiên Huế',
    'Thành phố Cần Thơ',
  ];
  filteredAddressOptions!: Observable<string[]>;
  filteredAddressMunicipal!: Observable<string[]>;
  // 24 hours options just h:00
  hrs: string[] = []; // default
  hrsMunicipal: string[] = [];
  // 48 hours include h:00 & h:30
  startAndReturnHrOptions: { label: string; value: number }[] = []; // rental and return car
  rentalHrOptions: RentalHourOption[] = [];
  selectedQuantity: string = '0:00';
  driverServiceFormGroup!: FormGroup;
  withDriverTimeUp!: string;
  withMunDriverTimeUp!: string;
  selfDrivingFormGroup!: FormGroup;
  todayDate = format(addDays(new Date(), 1), "yyyy-MM-dd");
  interMunicipalFormGroup!: FormGroup;
  isValidMunicipalForm!: boolean;
  isValidUrbanForm!: boolean;

  today = new Date();
  tomorrow = addDays(new Date(), 1);
  startDayOfToday = startOfDay(this.today);
  startDayOfTomorrow = startOfDay(this.tomorrow);
  hoursToday = this.today.getHours() * 60 * 60 * 1000 + this.today.getMinutes() * 60 * 1000;
  hoursTomorrow = this.tomorrow.getHours() * 60 * 60 * 1000 + this.tomorrow.getMinutes() * 60 * 1000;

  constructor(private _fb: FormBuilder, private router: Router) {
    this.setHrsData();
    this._setStartAndReturnHrOpts();
    this._setRentalHrsOpts();
    this.driverServiceFormGroup = this._fb.group({
      pickUpPlace: ['', Validators.required],
      startTime: this._fb.group({
        rentalDate: ['', Validators.required],
        startHour: ['', Validators.required],
        rentalHours: [this.rentalHrOptions[0].value, Validators.required],
      }),
      endTime: this._fb.group({
        rentalDate: [''],
        endHour: [''],
      }),
    });
    this.interMunicipalFormGroup = this._fb.group({
      pickUpPlace: ['', Validators.required],
      destinationPlace: ['', Validators.required],
      // isOneWay: [false],
      startTime: this._fb.group({
        rentalDate: ['', Validators.required],
        startHour: ['', Validators.required],
        rentalHours: [this.rentalHrOptions[0].value, Validators.required],
      }),
      endTime: this._fb.group({
        rentalDate: [''],
        endHour: [''],
      }),
    });
    this.selfDrivingFormGroup = this._fb.group({
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      startHour: ['', Validators.required],
      endDate: ['', Validators.required],
      endHour: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {
  }
  ngOnInit(): void {
    /* 
      detach change event of pickUpPlace FormControl of driverServiceFormGroup
      => filter list of places to update auto complete
    */
    this.filteredAddressOptions = this.driverServiceFormGroup
      .get('pickUpPlace')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        switchMap((value) => {
          return value ? this._filter(value) : of([]);
        })
      );

    this.filteredAddressMunicipal = this.interMunicipalFormGroup
      .get('pickUpPlace')!
      .valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        switchMap((value) => {
          return value ? this._filter(value) : of([]);
        })
      );

    /* 
    */
    this.driverServiceFormGroup.valueChanges.subscribe(v => console.log(v));
    /* 
    detach change event of rentalDate$ and startHour$
    => reassign the options in rentalHrOptions to update view
    */

    let rentalDate$ = this.driverServiceFormGroup
      .get('startTime')!
      .get('rentalDate')!.valueChanges;
    let startHour$ = this.driverServiceFormGroup
      .get('startTime')!
      .get('startHour')!.valueChanges;
    combineLatest([rentalDate$, startHour$]).subscribe(
      ([rentalDateMoment, startHourMs]) => {
        let rentalDate = rentalDateMoment.valueOf();
        let startHour = startHourMs;
        this.rentalHrOptions.forEach((e, idx) => {
          if (idx !== 0) {
            let endHoursString: string = this._convertMsToTime(
              startHour + e.value
            );
            let endDateString = new Date(rentalDate + startHour + e.value);
            let getDate = endDateString.getDate();
            let getMonth = endDateString.getMonth() + 1;
            let getYear = endDateString.getFullYear();
            e.subLabel =
              this.withDriverTimeUp = `Kết thúc lúc ${endHoursString}\n${getDate}/${getMonth}/${getYear}`;
          }
        });
      }
    );

    let rentalDateMun$ = this.interMunicipalFormGroup
      .get('startTime')!
      .get('rentalDate')!.valueChanges;
    let startHourMun$ = this.interMunicipalFormGroup
      .get('startTime')!
      .get('startHour')!.valueChanges;
    combineLatest([rentalDateMun$, startHourMun$]).subscribe(
      ([rentalDateMoment, startHourMs]) => {
        let rentalDate = rentalDateMoment.valueOf();
        let startHour = startHourMs;
        this.rentalHrOptions.forEach((e, idx) => {
          if (idx !== 0) {
            let endHoursString: string = this._convertMsToTime(
              startHour + e.value
            );
            let endDateString = new Date(rentalDate + startHour + e.value);
            let getDate = endDateString.getDate();
            let getMonth = endDateString.getMonth() + 1;
            let getYear = endDateString.getFullYear();
            e.subLabel =
              this.withMunDriverTimeUp = `Kết thúc lúc ${endHoursString}\n${getDate}/${getMonth}/${getYear}`;
          }
        });
      }
    );
    /* 
    detach change event of driverServiceFormGroup
    => reassign the options in rentalHrOptions to update view
    */
    this.driverServiceFormGroup
      .get('startTime')
      ?.get('rentalHours')
      ?.valueChanges.subscribe((v) => {
      });
  }
  /* 
    filter search with auto complete
    */
  //search address on input
  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return timer(500).pipe(
      map((_) => this.options),
      map((addresses) => {
        return addresses.filter((address) =>
          address.toLowerCase().includes(filterValue)
        );
      })
    );
  }
  private setHrsData() {
    for (let i = 0; i <= 23; i++) {
      let str = `${i}:00`;
      this.hrs.push(str);
    }
  }
  /* 
    
    */
  private _setStartAndReturnHrOpts() {
    for (let i = 0; i <= 23; i++) {
      let minutesOps = ['00', '30'];
      minutesOps.forEach((m) => {
        let tempValue = i * 3600000;
        if (m === '30') {
          tempValue += 1800000;
        }
        this.startAndReturnHrOptions.push({
          label: `${i}:${m}`,
          value: tempValue,
        });
      });
    }
  }
  /* 
    
    */
  private _setRentalHrsOpts() {
    this.rentalHrOptions.push({
      label: `Tuỳ chọn`,
      value: -1,
    });
    for (let index = 2; index <= 60; index++) {
      this.rentalHrOptions.push({
        label: `${index} tiếng`,
        value: index * 3600000,
      });
    }
  }

  /* 
    
    */
  private _padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }

  private _convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;
    return `${this._padTo2Digits(hours)}:${this._padTo2Digits(minutes)}`;
  }
  onSubmitUrbanWithDriverForm() {
    let formValue = this.driverServiceFormGroup.value
    formValue.startTime.rentalDate = formValue.startTime.rentalDate.valueOf()
    formValue.endTime.rentalDate = formValue.endTime.rentalDate.valueOf()

    let navigationExtra: NavigationExtras = {};

    if (formValue.startTime.rentalHours === -1) { //custom hours
      let rentalStartHrsMs: number = formValue.startTime.rentalDate + formValue.startTime.startHour
      let returnHrsMs: number = formValue.endTime.rentalDate + formValue.endTime.endHour
      // let truthRentalHrsMs: number = returnHrsMs - rentalStartHrsMs
      // formValue.truthRentalHrs = truthRentalHrsMs

      // console.log("start custom", new Date(rentalStartHrsMs))
      // console.log("end custom", new Date(returnHrsMs));

      navigationExtra = {
        queryParams: {
          startDate: rentalStartHrsMs,
          endDate: returnHrsMs,
          address: formValue.pickUpPlace,
          withDriver: true,
          urbanArea: true
        },
      }

    } else { // prefix hours
      // formValue.truthRentalHours = formValue.startTime.rentalHours
      // formValue.endTime = undefined

      let rentalStartHrsMs: number = formValue.startTime.rentalDate + formValue.startTime.startHour
      let rentalHoursMs: number = formValue.startTime.rentalHours
      // console.log("start prefix", new Date(rentalStartHrsMs));
      // console.log("end prefix", new Date(rentalStartHrsMs + rentalHoursMs));

      navigationExtra = {
        queryParams: {
          startDate: rentalStartHrsMs,
          endDate: rentalStartHrsMs + rentalHoursMs,
          address: formValue.pickUpPlace,
          withDriver: true,
          urbanArea: true
        }
      };
    }

    if (this.driverServiceFormGroup.invalid) {
      this.isValidUrbanForm = false
    } else {
      //prefix case
      if (formValue.startTime.rentalHours > 0) {
        if (formValue.startTime.rentalDate < 0 || formValue.startTime.startHour < 0) {
          this.isValidUrbanForm = false;
        } else {
          this.isValidUrbanForm = true;
        }
        //custom case
      } else {
        if (formValue.startTime.rentalDate < 0 || formValue.startTime.startHour < 0 || formValue.endTime.rentalDate < formValue.startTime.rentalDate || formValue.endTime.endHour == '') {
          this.isValidUrbanForm = false;
        } else {
          this.isValidUrbanForm = true;
        }
      }
    }
    console.log(this.isValidUrbanForm);


    if (this.isValidUrbanForm)
      this.router.navigate(['find/filter'], navigationExtra);
    // const truthFormValue: DriverService = formValue;
    // console.log(truthFormValue);
    // alert(JSON.stringify(truthFormValue, null, 4));
  }

  onSubmitSelfDriveForm() {
    let address = this.selfDrivingFormGroup.get('address')?.value;
    let startDateObj = this.selfDrivingFormGroup.get('startDate')?.value;
    let startHour = this.selfDrivingFormGroup.get('startHour')?.value;
    let endDate = this.selfDrivingFormGroup.get('endDate')?.value;
    let endHour = this.selfDrivingFormGroup.get('endHour')?.value;

    let startDateInMiliseconds = this.getDateInMiliseconds(startDateObj, startHour);
    let endDateInMiliseconds = this.getDateInMiliseconds(endDate, endHour);

    let navigationExtra: NavigationExtras = {
      queryParams: {
        startDate: startDateInMiliseconds,
        endDate: endDateInMiliseconds,
        address: address,
      },
    }

    if (this.selfDrivingFormGroup.valid)
      this.router.navigate(['find/filter'], navigationExtra);
  }

  onSubmitMunicipalWithDriverForm() {
    let formValue = this.interMunicipalFormGroup.value
    formValue.startTime.rentalDate = formValue.startTime.rentalDate.valueOf()
    formValue.endTime.rentalDate = formValue.endTime.rentalDate.valueOf()
    // let isOneWay = formValue.isOneWay

    let navigationExtra: NavigationExtras = {};

    if (formValue.startTime.rentalHours === -1) { //custom hours
      let rentalStartHrsMs: number = formValue.startTime.rentalDate + formValue.startTime.startHour
      let returnHrsMs: number = formValue.endTime.rentalDate + formValue.endTime.endHour

      navigationExtra = {
        queryParams: {
          startDate: rentalStartHrsMs,
          endDate: returnHrsMs,
          pickUpPlace: formValue.pickUpPlace,
          destinationPlace: formValue.destinationPlace,
          withDriver: true,
          interMunicipal: true,
          // isOneWay: isOneWay
        },
      }

    } else { // prefix hours
      let rentalStartHrsMs: number = formValue.startTime.rentalDate + formValue.startTime.startHour
      let rentalHoursMs: number = formValue.startTime.rentalHours

      navigationExtra = {
        queryParams: {
          startDate: rentalStartHrsMs,
          endDate: rentalStartHrsMs + rentalHoursMs,
          pickUpPlace: formValue.pickUpPlace,
          destinationPlace: formValue.destinationPlace,
          withDriver: true,
          interMunicipal: true,
          // isOneWay: isOneWay
        }
      };
    }

    if (this.interMunicipalFormGroup.invalid) {
      this.isValidMunicipalForm = false
    } else {
      //prefix case
      if (formValue.startTime.rentalHours > 0) {
        console.log("prefix case");

        if (formValue.startTime.rentalDate < 0 || formValue.startTime.startHour < 0) {
          this.isValidMunicipalForm = false;
        } else {
          this.isValidMunicipalForm = true;
        }
        //custom case
      } else {
        console.log("custom case");
        console.log(Number(formValue.endTime.endHour) < 0);

        if (formValue.startTime.rentalDate < 0 || formValue.startTime.startHour < 0 || formValue.endTime.rentalDate < formValue.startTime.rentalDate || formValue.endTime.endHour == '') {
          this.isValidMunicipalForm = false;
        } else {
          this.isValidMunicipalForm = true;
        }
      }
    }

    if (this.isValidMunicipalForm)
      this.router.navigate(['find/filter'], navigationExtra);
  }


  setDateHoursAndMinutes(date: Date, hours: String) {
    let hoursAndMinutes = hours.split(':');
    date.setHours(parseInt(hoursAndMinutes[0]));
    date.setMinutes(parseInt(hoursAndMinutes[1]));
    return date;
  }

  getHoursInMiliseconds(hours: String) {
    let hoursAndMinutes = hours.split(':');
    let hoursInMiliseconds = parseInt(hoursAndMinutes[0]) * 60 * 60 * 1000;
    let minutesInMiliseconds = parseInt(hoursAndMinutes[1]) * 60 * 1000;
    return hoursInMiliseconds + minutesInMiliseconds;
  }

  getDateInMiliseconds(date: any, hours: String) {
    let dateObj = date._d ? new Date(date._d) : new Date(date);
    let dateObjInMiliseconds = this.setDateHoursAndMinutes(dateObj, hours).getTime();
    return dateObjInMiliseconds;
  }

  getFinalDateInFormat() {
    let startRentalDate = this.driverServiceFormGroup
      .get('startTime')?.get('rentalDate')?.value;
    let startRentalHour = this.driverServiceFormGroup.get('startTime')?.get('startHour')?.value;
    let rentalHour = this.driverServiceFormGroup.get('startTime')?.get('rentalHours')?.value;
    let finalDate = new Date(startRentalDate + startRentalHour + rentalHour);
    return "Kết thúc lúc " + format(finalDate, 'hh:mm a dd/MM/yyyy');
  }

  getFinalDateMunicipal() {
    let startRentalDate = this.interMunicipalFormGroup
      .get('startTime')?.get('rentalDate')?.value;
    let startRentalHour = this.interMunicipalFormGroup.get('startTime')?.get('startHour')?.value;
    let rentalHour = this.interMunicipalFormGroup.get('startTime')?.get('rentalHours')?.value;
    let finalDate = new Date(startRentalDate + startRentalHour + rentalHour);
    return "Kết thúc lúc " + format(finalDate, 'hh:mm a dd/MM/yyyy');
  }

  getNDayHoursInMiliseconds(day: number) {
    const hours = addDays(new Date(), day).getHours();
    const minutes = addDays(new Date(), day).getMinutes();
    const finalMinutes = minutes < 30 ? 0 : 30;
    return (this.getHoursInMiliseconds(String(hours + ":" + finalMinutes)));
  }
}
