import { Injectable } from '@angular/core';
export interface RentalHourOption {
  label: string;
  subLabel?: string;
  value: number;
}
@Injectable({
  providedIn: 'root'
})
export class TimerUtilService {
 // 24 hours options just h:00
  hrs: string[] = []; // default
  // 48 hours include h:00 & h:30
  startAndReturnHrOptions: { label: string; value: number }[] = []; // rental and return car
  rentalHrOptions: RentalHourOption[] = [];
  constructor() {
    this._setStartAndReturnHrOpts()
    this._setRentalHrsOpts()
  }
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
  formatTime(date: Date): string{
    return date.getHours() + ":" + date.getMinutes() + ""
  }
  formatDate(date: Date): string{
    return date.getDate() + "/" + date.getMonth() + "/"+ date.getFullYear() +  ""
  }
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
  formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${formattedHours}:${formattedMinutes}`;
  }
}
