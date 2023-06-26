import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, debounceTime, switchMap, of, map, timer } from 'rxjs';

@Component({
  selector: 'app-my-location',
  templateUrl: './my-location.component.html',
  styleUrls: ['./my-location.component.scss']
})
export class MyLocationComponent implements OnInit{
  addressControl = new FormControl('');
  options: string[] = [
    'Thành phố Hồ Chí Minh',
    'Hà Nội',
    'Thừa Thiên Huế',
    'Thành phố Cần Thơ',
  ];
  filteredAddressOptions!: Observable<string[]>;
  ngOnInit(): void {
    /* 
        detach change event of pickUpPlace FormControl of driverServiceFormGroup
        => filter list of places to update auto complete
      */
        this.filteredAddressOptions = this.addressControl!
        .valueChanges.pipe(
          startWith(''),
          debounceTime(500),
          switchMap((value) => {
            return value ? this._filter(value) : of([]);
          })
        );
  }
    /* 
    filter search with auto complete
    */
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
}
