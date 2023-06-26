import { registerLocaleData } from '@angular/common';
import localeVietnam from '@angular/common/locales/vi';
import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  CalendarEvent, CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CarOwnerService } from '../../services/car-owner.service';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { UserService } from 'src/app/customer/services/user.service';


registerLocaleData(localeVietnam);
const colors: Record<string, EventColor> = {
  rented: {
    primary: 'red',
    secondary: 'red',
  },
  pending: {
    primary: '#fba86d',
    secondary: '#fba86d',
  },
  accepted: {
    primary: '#00a550',
    secondary: '#00a550'
  }
};


@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
  styleUrls: ['./calendars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: LOCALE_ID, useValue: 'vi-VN'
    },
  ],
})
export class CalendarsComponent {
  username!: string;
  constructor(private _formBuilder: FormBuilder, private carOwnerService: CarOwnerService, private userService: UserService) {
    this.userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  sortedByFormGroup = this._formBuilder.group({
    sortedBy: ['0'],
    nameOrCarPlate: ['']
  });
  locale: string = 'vi';
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;

  events: CalendarEvent[] = [];
  filteredEvents: CalendarEvent[] = [];
  activeDayIsOpen!: boolean;
  refresh = new Subject<void>();

  ngOnInit(): void {
    //test user only
    this.carOwnerService.getAllCalendar(this.username).subscribe(res => {
      res.forEach(i => {
        this.events.push({
          start: new Date(i.startDate),
          end: new Date(i.endDate),
          title: i.modelName + " " + i.yearOfManufacture + " - " + getMoneyFormat(i.rentalPrice) + " - " + i.plate,
          color: colors[i.status.toLowerCase()]
        })
      })
      this.filteredEvents = [...this.events];
      this.refreshView();
    })
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
        // events.length === 0 || this.isBusy({ events: events })
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    console.log("time changed");
    console.log(event, newStart, newEnd);

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }

  //disable busy date ( set background to gray )
  // cssClass: string = "bg-busy";
  // beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
  //   body.forEach((day) => {
  //     if (this.isBusy(day)) {
  //       day.cssClass = this.cssClass;
  //     }
  //   });
  // }

  // sortedByOrder = false;
  // toggleSortedByOrder() {
  //   this.sortedByOrder = !this.sortedByOrder;
  //   this.sortCalendars();
  // }

  // sortCalendars() {

  // }

  searchByNameCarPlate() {
    const value = this.sortedByFormGroup.get('nameOrCarPlate')?.value
    this.filteredEvents = this.events.filter(i => i.title.toLowerCase().indexOf(String(value?.toLowerCase())) > -1);
    this.refreshView();
  }

  refreshView(): void {
    this.refresh.next();
  }

  // isBusy(event: any): Boolean {
  //   const { events } = event;
  //   return events.some((i: { color: { primary: string; }; }) => i.color.primary === colors['busy'].primary);
  // }

  rentedSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['rented'].primary).length;
  }

  acceptedSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['accepted'].primary).length;
  }

  pendingSize(event: any): number {
    const { events } = event;
    return events.filter((i: { color: { primary: string; }; }) => i.color.primary === colors['pending'].primary).length;
  }

  getMoneyFormat(money: number) {
    return getMoneyFormat(money);
  }
}
