import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'mwl-calendar-header',
  template: `
    <div class="mx-auto text-center">
          <div
            class="btn btn-primary btn-action"
            mwlCalendarPreviousView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            {{'calendar.previousMonth'|i18next}}
          </div>
          <div
            class="btn btn-outline-secondary btn-action"
            mwlCalendarToday
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            {{'calendar.today'|i18next}}
          </div>
          <div
            class="btn btn-primary btn-action"
            mwlCalendarNextView
            [view]="view"
            [(viewDate)]="viewDate"
            (viewDateChange)="viewDateChange.next(viewDate)"
          >
            {{'calendar.nextMonth'|i18next}}
          </div>
      <div>
        <h2>{{ viewDate | calendarDate: view + 'ViewTitle':locale }}</h2>
      </div>
    </div>
    <br />
  `,
  styleUrls: ['./calendar-header.component.scss'],
})
export class CalendarHeaderComponent {
  @Input() view!: CalendarView;

  @Input() viewDate!: Date;

  @Input() locale: string = 'vi';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  CalendarView = CalendarView;
}
