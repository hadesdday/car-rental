import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { UserService } from 'src/app/customer/services/user.service';
import { CAR_IMG } from 'src/app/models/constance';
import { RentalListingResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss']
})
export class RentalListingComponent {
  locale: any;
  rentalList: RentalListingResponse[] = [];
  sortedRentalList: RentalListingResponse[] = [];
  readonly BASE_IMG = CAR_IMG;
  username!: string;
  constructor(private _formBuilder: FormBuilder, private carService: CarOwnerService, private userService: UserService) {
    this.locale = { vi: vi }
    this.userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  rentalListSortFormGroup = this._formBuilder.group({
    orderBy: ['0'],
  });

  ngOnInit(): void {
    //test user only
    this.carService.getRentalListByOwner(this.username).subscribe(res => {
      this.rentalList = res;
      this.sortedRentalList = res;
    });

    this.rentalListSortFormGroup.get('orderBy')?.valueChanges.subscribe(value => {
      console.log("changed");

      if (Number(value) < 1)
        this.sortedRentalList = this.sortedRentalList.sort((a, b) => {
          return b.startDate - a.startDate;
        });
      else
        this.sortedRentalList = this.sortedRentalList.sort((a, b) => {
          return a.startDate - b.startDate;
        });
    });
  }

  getFormattedDate(date: number) {
    return format(new Date(date), "dd/MM/yyyy hh:mm", { locale: this.locale.vi });
  }

  getFormattedMoney(money: number) {
    return getMoneyFormat(money);
  }

  getRoundedRating(rating: number) {
    return Math.round(rating);
  }
}
