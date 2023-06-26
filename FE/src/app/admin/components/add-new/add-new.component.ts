import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ChangePasswordDialogComponent } from 'src/app/customer/components/auth/components/dialogs/change-password-dialog/change-password-dialog.component';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { OTPType } from 'src/app/models/enum';
import { NewPromoRequest } from 'src/app/models/request/model';
import { PromoService } from 'src/app/services/promo.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent {
  promoFG!: FormGroup;
  constructor(
    private _promoService: PromoService,
    private _fb: FormBuilder,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService
  ) {
    this.promoFG = this._fb.group({
      title: ['', Validators.required],
      contents: this._fb.array([
        ["", Validators.required]
      ]),
      quantity: ['', Validators.required],
      discountPercent: ['', Validators.required],
      maxPrice: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  get contentsArray(): FormArray{
    return this.promoFG.get("contents") as FormArray
  }
  addContent(){
    this.contentsArray.push(this._fb.control("", Validators.required))
  }
  removeContent(index: number){
    if(this.contentsArray.length > 1){
      this.contentsArray.removeAt(index)
    }
  }
  obSubmitNewPromo(value: NewPromoRequest) {
    this._promoService
      .addNewPromo(value)
      .pipe(
        tap((response) => {
          this._progressSpinnerService.next(false);
          const { data, statusCode } = response;
          if (statusCode === 200) {
            let dataDialog = {
              title: 'Thành công',
              message: data,
            };
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
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
