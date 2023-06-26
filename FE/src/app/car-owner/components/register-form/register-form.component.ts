import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, lastValueFrom } from 'rxjs';
import { UserService } from 'src/app/customer/services/user.service';
import { COLORS, DELIVERY_TO_TENANT, DISTANCE_LIMIT, DISTANCE_UNIT, FEATURE_DIRECT_LINK, MONEY_UNIT } from 'src/app/models/constance';
import { ServiceType } from 'src/app/models/enum';
import { Color, Location, LocationResponse } from 'src/app/models/model';
import { CarRegisterRequest, ExtraFeeRequest } from 'src/app/models/request/model';
import { BrandResponse, CarModelResponse, DistrictResponse, FeatureResponse, ProvinceResponse, WardResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { CarOwnerService } from '../../services/car-owner.service';
import { UploadFileService } from '../../services/upload-file.service';
import { RedirectDialogComponent } from './redirect-dialog/redirect-dialog.component';
import { I18NextService } from 'angular-i18next';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent {
  carSeatRange!: Number[];
  carProduceYearRange!: Number[];
  carFeatures!: number[];
  recommendPrice = 500000;
  recommendPriceInFormat = getMoneyFormat(this.recommendPrice);
  showAddressModal = false;
  fetchedDistricts: DistrictResponse[];
  fetchedWards!: WardResponse[];
  fetchedLocation!: Location[];
  fetchedBrands: BrandResponse[] = [];
  colors: Color[] = [
    { "value": "WHITE", "name": this.i18nextService.t("colors.white")?.toString() || "" },
    { "value": "BLACK", "name": this.i18nextService.t("colors.black")?.toString() || "" },
    { "value": "NAVYBLUE", "name": this.i18nextService.t("colors.navyBlue")?.toString() || "" },
    { "value": "SILVER", "name": this.i18nextService.t("colors.silver")?.toString() || "" },
    { "value": "GRAY", "name": this.i18nextService.t("colors.gray")?.toString() || "" },
    { "value": "RED", "name": this.i18nextService.t("colors.red")?.toString() || "" },
    { "value": "GREEN", "name": this.i18nextService.t("colors.green")?.toString() || "" },
    { "value": "BROWN", "name": this.i18nextService.t("colors.brown")?.toString() || "" },
    { "value": "YELLOW", "name": this.i18nextService.t("colors.yellow")?.toString() || "" },
    { "value": "TURQUOISE", "name": this.i18nextService.t("colors.turquoise")?.toString() || "" }
  ];
  files: File[] = [];
  fetchedCarModels: CarModelResponse[] = [];
  fetchedCarFeatures: FeatureResponse[] = [];
  uploadedImages: string[] = [];
  cloneFiles: File[] = [];
  readonly FEATURE_DIRECT_LINK: string = FEATURE_DIRECT_LINK;
  fetchedProvinces: ProvinceResponse[] = [];

  constructor(private _formBuilder: FormBuilder, private carServices: CarOwnerService,
    private uploadService: UploadFileService, private toastService: ToastrService,
    private _matDialog: MatDialog, private userService: UserService, private i18nextService: I18NextService) {
    this.carSeatRange = [];
    this.carProduceYearRange = [];
    this.carFeatures = [];
    this.fetchedDistricts = [];
    this.fetchedWards = [];
    this.fetchedLocation = [];
  }

  carInformationFormGroup = this._formBuilder.group({
    carNumberPlate: ['', [Validators.required, Validators.pattern(/^[0-9]{2}[A-z]{1,2}-[0-9]{3}\.[0-9]{2}$/)]],
    carBrand: ['', Validators.required],
    carModel: ['', Validators.required],
    carSeats: ['', Validators.required],
    carProdYear: ['', Validators.required],
    carTransmission: ['', Validators.required],
    carFuel: ['', Validators.required],
    carColor: ['', Validators.required],
    carFuelConsumption: ['', [Validators.required, Validators.min(0), Validators.max(50)]],
    carDescription: ['', Validators.required],
  });

  toggleDiscountGroup = new FormGroup({
    isDiscount: new FormControl(true),
    discountPercentByWeek: new FormControl(1),
    discountPercentByMonth: new FormControl(1)
  });

  toggleFastRentGroup = new FormGroup({
    isFastRent: new FormControl(false),
    limitFrom: new FormControl("6"),
    untilWeek: new FormControl("2"),
  });

  toggleDeliveryGroup = new FormGroup({
    isDeliveryToTenant: new FormControl(false),
    deliveryFee: new FormControl("1000")
  });

  toggleLimitDistanceGroup = new FormGroup({
    isLimitDistance: new FormControl(false),
    limitDistance: new FormControl("300"),
    limitDistanceFee: new FormControl("1000")
  });

  toggleWithDriverGroup = new FormGroup({
    isWithDriver: new FormControl(false)
  });

  toggleWithDriverInterstateGroup = new FormGroup({
    isChecked: new FormControl(false)
  });

  forRentFormGroup = this._formBuilder.group({
    defaultPrice: [this.recommendPrice, [Validators.required, Validators.min(100000), Validators.max(5000000)]],
    defaultLocation: ['', Validators.required],
    policies: ['']
  });

  addressFormGroup = this._formBuilder.group({
    street: ['', Validators.required],
    district: ['', Validators.required],
    ward: ['', Validators.required],
    city: ['', Validators.required]
  });

  username!: string;
  ngOnInit(): void {
    this.initDynamicData();
    this.onChangeStreet();
    this.onChangeCarBrand();

    this.userService.user$.subscribe(v => {
      this.username = v?.username!;
    });
  }

  onChangeCity() {
    const provinceId = Number(this.addressFormGroup.get('city')?.value);
    this.fetchedWards = [];
    this.carServices.getDistrictByProvinceId(provinceId).subscribe((res) => {
      this.fetchedDistricts = res;
      this.addressFormGroup.get('district')?.setValue("");
      this.addressFormGroup.get('ward')?.setValue("");
    });
  }

  onChangeDistrict() {
    const provinceId = Number(this.addressFormGroup.get('city')?.value);
    const districtCode = Number(this.addressFormGroup.get('district')?.value);
    this.carServices.getWardByProvinceAndDistrict(provinceId, districtCode).subscribe((res) => {
      this.fetchedWards = res;
      this.addressFormGroup.get('ward')?.setValue("");
    });
  }

  onChangeStreet() {
    this.addressFormGroup.get('street')?.valueChanges.pipe(distinctUntilChanged(), debounceTime(250)).subscribe(location => {
      this.carServices.searchAddress(String(location)).subscribe((res: LocationResponse) => {
        this.fetchedLocation = res.data.locations;
      });
    });
  }

  onSubmitAddress() {
    const cityCode = Number(this.addressFormGroup.get('city')?.value);
    const districtCode = Number(this.addressFormGroup.get('district')?.value);
    const wardCode = Number(this.addressFormGroup.get('ward')?.value);
    const street = this.addressFormGroup.get('street')?.value;

    const cityName = this.findCityNameByCode(cityCode);
    const districtName = this.findDistrictNameByCode(districtCode);
    const wardName = this.findWardNameByCode(wardCode);

    const finalLocation = `${street}, ${wardName}, ${districtName}, ${cityName}`;
    this.forRentFormGroup.get('defaultLocation')?.setValue(finalLocation);
    this.toggleAddressModal();
  }

  findCityNameByCode(areaCode: number) {
    const foundCity = this.fetchedProvinces.find((item) => item.code === areaCode);
    return foundCity?.name;
  }

  findDistrictNameByCode(districtCode: number) {
    const foundDistrict = this.fetchedDistricts.find((district) => district.id === districtCode);
    return foundDistrict?.name;
  }

  findWardNameByCode(wardCode: number) {
    const foundWard = this.fetchedWards.find((ward) => ward.id === wardCode);
    return foundWard?.name;
  }

  getModelsByBrand(brandId: number) {
    this.carServices.getModelsByBrandId(Number(brandId)).subscribe((res) => {
      this.fetchedCarModels = res;
    });
  }

  onChangeCarBrand() {
    this.carInformationFormGroup.get("carBrand")?.valueChanges.subscribe((val) => {
      this.getModelsByBrand(Number(val));
    });
  }

  async initDynamicData() {
    for (let i = 4; i < 21; i++) this.carSeatRange.push(i);
    for (let i = new Date().getFullYear(); i >= 1960; i--) this.carProduceYearRange.push(i);

    const brands$ = this.carServices.getBrands();
    this.fetchedBrands = await lastValueFrom(brands$);

    this.carServices.getAllFeature().subscribe((res) => {
      this.fetchedCarFeatures = res;
    });

    const provinces$ = this.carServices.getAllProvince();
    this.fetchedProvinces = await lastValueFrom(provinces$);
  }

  toggleAddressModal() {
    this.showAddressModal = !this.showAddressModal;
  }

  handleClickFeature(elm: number) {
    const foundFeature = this.carFeatures.find((feature) => feature === elm);

    if (foundFeature) {
      const element = document.getElementById(elm.toString());
      element?.classList.remove('active');
      this.carFeatures = this.carFeatures.filter((feature) => feature !== foundFeature);
    } else {
      const element = document.getElementById(elm.toString());
      element?.classList.add('active');
      this.carFeatures.push(elm);
    }
    console.log(this.carFeatures);
  }

  onSelect(event: any) {
    console.log("upload file event", event);
    this.files.push(...event.addedFiles);
    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("files", this.files[i]);
    }

    this.uploadService.uploadFile(formData).subscribe(
      (res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.cloneFiles[i] = (new File([this.files[i]], res[i]));
        }
        this.uploadedImages.push(...res);
        console.log("clone files ", this.cloneFiles);
      }
    );
  }

  onRemove(event: any) {
    console.log("delete file event", event);
    this.uploadService.deleteFile(event.name).subscribe((res) => {
      console.log("delete successfully ", res);
      this.cloneFiles.splice(this.cloneFiles.indexOf(event), 1);
    });
  }

  onSubmitRegisterCar() {
    const username = this.username;
    const carNumberPlate = this.carInformationFormGroup.get("carNumberPlate")?.value;
    const carBrand = this.carInformationFormGroup.get("carBrand")?.value;
    const carModel = this.carInformationFormGroup.get("carModel")?.value;
    const carSeats = this.carInformationFormGroup.get("carSeats")?.value;
    const carProdYear = this.carInformationFormGroup.get("carProdYear")?.value;
    const carTransmission = this.carInformationFormGroup.get("carTransmission")?.value;
    const carFuel = this.carInformationFormGroup.get("carFuel")?.value;
    const carColor = this.carInformationFormGroup.get("carColor")?.value;
    const carFuelConsumption = Number(this.carInformationFormGroup.get("carFuelConsumption")?.value);
    const carDescription = this.carInformationFormGroup.get("carDescription")?.value;
    const features = this.carFeatures;
    const defaultPrice = Number(this.forRentFormGroup.get("defaultPrice")?.value);
    let discountByWeek = 0, discountByMonth = 0;

    const isDiscountGroup = this.toggleDiscountGroup.get("isDiscount")?.value;
    if (isDiscountGroup === true) {
      discountByWeek = Number(this.toggleDiscountGroup.get("discountPercentByWeek")?.value);
      discountByMonth = Number(this.toggleDiscountGroup.get("discountPercentByMonth")?.value);
    } else {
      discountByWeek = 0;
      discountByMonth = 0;
    }

    const isFastRent = this.toggleFastRentGroup.get("isFastRent")?.value;

    const address = this.forRentFormGroup.get("defaultLocation")?.value;

    let extraFees: ExtraFeeRequest[] = [];
    const isDeliveryToTenant = this.toggleDeliveryGroup.get("isDeliveryToTenant")?.value;
    if (isDeliveryToTenant === true) {
      const deliveryFee = this.toggleDeliveryGroup.get("deliveryFee")?.value;
      extraFees.push({
        name: DELIVERY_TO_TENANT,
        limit: 0,
        unit: MONEY_UNIT,
        fee: Number(deliveryFee)
      });
    } else {
      extraFees = extraFees.filter((fee) => fee.name !== DELIVERY_TO_TENANT);
    }


    const isLimitDistance = this.toggleLimitDistanceGroup.get('isLimitDistance')?.value;
    if (isLimitDistance === true) {
      const limitDistance = this.toggleLimitDistanceGroup.get('limitDistance')?.value;
      const limitDistanceFee = this.toggleLimitDistanceGroup.get('limitDistanceFee')?.value;
      extraFees.push({
        name: DISTANCE_LIMIT,
        limit: Number(limitDistance),
        unit: DISTANCE_UNIT,
        fee: Number(limitDistanceFee)
      });
    } else {
      extraFees = extraFees.filter((fee) => fee.name !== DISTANCE_LIMIT);
    }

    let serviceType = ServiceType.SELF_DRIVING;
    const isWithDriver = this.toggleWithDriverGroup.get('isWithDriver')?.value
    const isWithDriverInterstate = this.toggleWithDriverInterstateGroup.get('isChecked')?.value;

    if (!isWithDriver) {
      serviceType = ServiceType.SELF_DRIVING;
    } else if (isWithDriver && isWithDriverInterstate) {
      serviceType = ServiceType.WITH_DRIVER_INTERSTATE;
    } else {
      serviceType = ServiceType.WITH_DRIVER_DOMESTIC;
    }

    const policies = this.forRentFormGroup.get('policies')?.value;

    const imagesList = this.cloneFiles.map(i => i.name);

    const wardId = Number(this.addressFormGroup.value.ward);
    const districtId = Number(this.addressFormGroup.value.district);
    const provinceId = Number(this.addressFormGroup.value.city);

    const carRequest: CarRegisterRequest = {
      username: username,
      plate: String(carNumberPlate),
      modelId: Number(carModel),
      brandId: Number(carBrand),
      seats: Number(carSeats),
      color: String(carColor),
      fuel: String(carFuel),
      fuelConsumption: Number(carFuelConsumption),
      transmission: String(carTransmission),
      description: String(carDescription),
      yearOfManufacture: Number(carProdYear),
      featureList: features,
      defaultPrice: Number(defaultPrice),
      discountByWeek: Number(discountByWeek),
      discountByMonth: Number(discountByMonth),
      isFastRent: Boolean(isFastRent),
      addressName: String(address),
      extraFees: extraFees,
      serviceTypeId: serviceType,
      policies: String(policies),
      imagesList: imagesList,
      wardId: wardId,
      districtId: districtId,
      provinceId: provinceId
    };

    console.log(carRequest);
    this.carServices.registerNewCar(carRequest).subscribe({
      complete: () => {
        this.showRedirectDialog();
        // this.toastService.success("Đăng ký xe thành công", "Thành công");
      },
      error: (res) => {
        this.toastService.error(res.error, "Thất bại");
      }
    });
  }

  showRedirectDialog() {
    this._matDialog.open(RedirectDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      disableClose: true
    });
  }

  resetForms() {
    this.carInformationFormGroup.reset();
    this.toggleDiscountGroup.reset();
    this.toggleFastRentGroup.reset();
    this.forRentFormGroup.reset();
    this.toggleDeliveryGroup.reset();
    this.toggleLimitDistanceGroup.reset();
    this.toggleWithDriverGroup.reset();
    this.toggleWithDriverInterstateGroup.reset();
    this.forRentFormGroup.reset();
  }
}


