import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { I18NEXT_NAMESPACE, I18NextModule } from 'angular-i18next';

@NgModule({
    imports: [CommonModule, FormsModule, CalendarModule, I18NextModule],
    declarations: [CalendarHeaderComponent],
    exports: [CalendarHeaderComponent],
    providers: [
        { provide: I18NEXT_NAMESPACE, useValue: [] }
    ]

})
export class CalendarHeaderModule { }
