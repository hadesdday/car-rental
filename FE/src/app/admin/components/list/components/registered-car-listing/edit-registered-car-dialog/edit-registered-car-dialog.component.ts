import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { BrandResponse, CarModelResponse, IdNameResponse, RegisteredCarDto } from 'src/app/models/response/model';

import { catchError, tap } from 'rxjs';
import { RegisteredCarService } from 'src/app/admin/services/registered-car.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { COLORS } from 'src/app/models/constance';
import { CarStatusVie } from 'src/app/models/enum';
import { Color } from 'src/app/models/model';
import { CarAdminRequest } from 'src/app/models/request/model';

@Component({
  selector: 'app-edit-registered-car-dialog',
  templateUrl: './edit-registered-car-dialog.component.html',
  styleUrls: ['./edit-registered-car-dialog.component.scss']
})
export class EditRegisteredCarDialogComponent {
  car!: RegisteredCarDto;
  carFormGroup!: FormGroup;
  colors: Color[] = COLORS;

  brands: BrandResponse[] = [];
  models: CarModelResponse[] = [];
  serviceTypes: IdNameResponse[] = [];
  // carStatuses: String[] = [];
  carStatuses = {
    key: Object.keys(CarStatusVie),
    value: Object.values(CarStatusVie)
  };

  constructor(private _fb: FormBuilder,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<EditRegisteredCarDialogComponent>,
    private services: RegisteredCarService
  ) {
    this.car = data.car;

    const { id, color, plate, brand, price, model, serviceType, status } = this.car

    this.carFormGroup = this._fb.group({
      id: [id, Validators.required],
      color: [color, Validators.required],
      plate: [plate, Validators.required],
      brand: [brand.id, Validators.required],
      model: [model.id, Validators.required],
      serviceType: [serviceType.id, Validators.required],
      price: [price, Validators.required],
      status: [status, Validators.required]
    });

    this.services.getBrands().subscribe(res => {
      this.brands = res;
    });

    this.services.getModelsByBrandId(brand.id).subscribe(res => {
      this.models = res;
    });

    this.services.getServiceTypes().subscribe(res => {
      this.serviceTypes = res;
    });

    this.carFormGroup.get("brand")?.valueChanges.subscribe(brandId => {
      this.carFormGroup.get("model")?.setValue(null);
      this.services.getModelsByBrandId(brandId).subscribe(res => {
        this.models = res;
      });
    });
    this.carFormGroup.get("plate")?.disable();
  }


  onSubmitForm() {
    const values: CarAdminRequest = this.carFormGroup.value;
    this._progressSpinnerService.next(true);
    this.services
      .updateCar(values)
      .pipe(
        tap((response: any) => {
          this._progressSpinnerService.next(false);

          if (response !== null) {
            let dataDialog = {
              title: 'Thành công',
              message: "Cập nhật thành công !",
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ updatedCar: response });
            });
          } else {
            let dataDialog = {
              title: 'Thất bại',
              message: response,
            };
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
          }
        }),
        catchError((error) => {
          this._progressSpinnerService.next(false);
          let dataDialog = {
            title: 'Thất bại',
            message: error.error,
          };
          this._messageDialogService.openMessageDialog(
            MessageDialogComponent,
            dataDialog
          );
          throw error;
        })
      )
      .subscribe();

  }

  closeDialog() {
    this.matDialogRef.close();
  }

}
