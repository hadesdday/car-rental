import { log } from 'console';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { PromoDTO } from 'src/app/models/model';
import { NewPromoRequest } from 'src/app/models/request/model';
import { PromoService } from 'src/app/services/promo.service';

@Component({
  selector: 'app-eidt-promo-dialog',
  templateUrl: './eidt-promo-dialog.component.html',
  styleUrls: ['./eidt-promo-dialog.component.scss'],
})
export class EditPromoDialogComponent {
  promoFG!: FormGroup;
  promo!: PromoDTO;
  constructor(
    private _promoService: PromoService,
    private _fb: FormBuilder,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<EditPromoDialogComponent>
  ) {
    this.promo = data.promo;
    let contentsArray = this._fb.array([]);
    this.promo.contents.forEach((content) => {
      contentsArray.push(this._fb.control(content, Validators.required));
    });
    const { title, quantity, discountPercent, maxPrice, startDate, endDate, status } =
      this.promo;
    console.log(this.promo)
    this.promoFG = this._fb.group({
      title: [title, Validators.required],
      contents: contentsArray,
      quantity: [quantity, Validators.required],
      discountPercent: [discountPercent, Validators.required],
      maxPrice: [maxPrice, Validators.required],
      startDate: [new Date(startDate), Validators.required],
      endDate: [new Date(endDate), Validators.required],
      status: [status, Validators.required]
    });
  }
  get contentsArray(): FormArray {
    return this.promoFG.get('contents') as FormArray;
  }
  addContent() {
    this.contentsArray.push(this._fb.control('', Validators.required));
  }
  removeContent(index: number) {
    if (this.contentsArray.length > 1) {
      this.contentsArray.removeAt(index);
    }
  }
  obSubmitUpdatePromo(value: PromoDTO) {
    value.id = this.promo.id;

    this._promoService
      .updatePromo(value)
      .pipe(
        tap((response) => {
          this._progressSpinnerService.next(false);
          const { data, statusCode } = response;
          if (statusCode === 200) {
            let dataDialog = {
              title: 'Thành công',
              message: data,
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ updatedPromo: value });
            });
          } else {
            let dataDialog = {
              title: 'Thất bại',
              message: data,
            };
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
          }
        })
      )
      .subscribe();
  }
}
