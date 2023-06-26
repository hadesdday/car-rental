import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CarOwnerService } from '../../services/car-owner.service';
import { RegisteredCarResponse } from 'src/app/models/response/model';
import { CarStatus } from 'src/app/models/enum';
import { CAR_IMG } from 'src/app/models/constance';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { UserService } from 'src/app/customer/services/user.service';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/model';
import { FilterRequest, Paging } from 'src/app/models/request/model';
import { CarResponse } from 'src/app/models/response/model';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.scss']
})

export class CarListingComponent implements OnInit {
  cars$!: Observable<CarResponse[]>
  initPaging!: Paging
  initFilterRequest!: FilterRequest
  username!: string;
  constructor(private _formBuilder: FormBuilder, private _carService: CarService, private _userService: UserService, private carService: CarOwnerService) {
    this._userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  readonly BASE_IMG: string = CAR_IMG;

  registeredCarList: RegisteredCarResponse[] = [];
  filteredCarList: RegisteredCarResponse[] = [];

  myCarsFormGroup = this._formBuilder.group({
    carStatus: ['ALL'],
  });

  ngOnInit(): void {
    //test user only
    this.carService.getAllRegisteredCar(this.username).subscribe(
      (data) => {
        console.log(data);
        this.registeredCarList = data;
        this.filteredCarList = data;
        if (this.registeredCarList.length < 1)
          this.myCarsFormGroup.disable();
      });
    this.myCarsFormGroup.get("carStatus")?.valueChanges.subscribe(data => {
      if (data === "ALL")
        this.filteredCarList = this.registeredCarList;
      else
        this.filteredCarList = this.registeredCarList.filter(i => i.status == data);
    });
  }

  getStatusName(status: CarStatus) {
    switch (status) {
      case CarStatus.BANNED:
        return "Tạm khóa";
      case CarStatus.PENDING_APPROVAL:
        return "Đang chờ duyệt";
      case CarStatus.ACTIVE:
        return "Đang hoạt động";
      case CarStatus.BUSY:
        return "Bận";
      case CarStatus.RENTED:
        return "Đã cho thuê";
      default:
        return "Không xác định";
    }
  }

  getStatusClassname(status: CarStatus) {
    switch (status) {
      case CarStatus.BANNED:
        return "suspend";
      case CarStatus.PENDING_APPROVAL:
        return "pending";
      case CarStatus.ACTIVE:
        return "active";
      case CarStatus.BUSY:
        return "busy";
      case CarStatus.RENTED:
        return "rented";
      default:
        return "";
    }
  }

  getMoneyInFormat(money: number) {
    return getMoneyFormat(money);
  }

  getRoundedRate(rate: number) {
    return Math.round(rate);
  }

  // ngOnInit(): void {
  //   let curUser: UserDTO = this._userService.userValue!
  //   this.initPaging = {
  //     page: 0, 
  //     size: 10
  //   }
  //   this.initFilterRequest = {
  //     paging: this.initPaging
  //   }
  //   this.cars$ = this._carService.findAllCar(curUser.id, this.initFilterRequest)
  // }
}
