import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { OTPType } from 'src/app/models/enum';
import { tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { ProgressSpinnerService } from '../../../../services/progress-spinner.service';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';

@Component({
  selector: 'otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss'],
})
export class OtpValidationComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  username!: string;
  otpTypeString!: string | null;
  otpType!: OTPType;
  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService
  ) {
    this.otpForm = this._fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this._authService.registerUsernameCurrentValue) {
      this.username = this._authService.registerUsernameCurrentValue;
    } else {
      window.history.back();
    }
    this.otpTypeString = this._activatedRoute.snapshot.paramMap.get('type');
    if (this.otpTypeString === 'register') {
      this.otpType = OTPType.REGISTER;
    } else if (this.otpTypeString === 'forget-password') {
      this.otpType = OTPType.FORGET_PASSWORD;
    } else {
      this._router.navigate(['/page-not-found']);
    }
  }

  onPaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const inputs: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, i) => {
        input.value = pastedData[i];
        this.otpForm.get(`digit` + (i + 1))?.patchValue(pastedData[i]);
      });
    }
    console.log(this.otpForm.value);
  }
  onSubmitMailOTP(username: string, otpForm: FormGroup) {
    this._progressSpinnerService.next(true);
    const otpArr: number[] = Object.values(otpForm.getRawValue());
    let otpNumberText: string = otpArr.join().replaceAll(',', '');
    this._authService
      .validateMailOTP(username, Number.parseInt(otpNumberText), this.otpType)
      .pipe(
        tap((otpValidationStatusResponse) => {
          this._progressSpinnerService.next(false);
          const { data, statusCode } = otpValidationStatusResponse;
          if (statusCode === 200) {
            if (this.otpType === OTPType.REGISTER) {
              let dataDialog = {
                title: 'Đăng ký thành công',
                message: data,
                navigatePages: ['home', 'login'],
              };
              this._messageDialogService
                .openMessageDialog(MessageDialogComponent, dataDialog)
                .afterClosed()
                .subscribe((_) => {
                  this._router.navigate(['/home']);
                });
            } else {
              this._matDialog.open(ChangePasswordDialogComponent, {
                enterAnimationDuration: '500ms',
                exitAnimationDuration: '500ms',
                data: { username },
              });
            }
          } else {
            let dataDialog = {
              title: 'Sai mã xác thực',
              message: data,
              navigatePages: ['close'],
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
  resendMailOTP(otpType: OTPType) {
    this._progressSpinnerService.next(true);
    let username = this._authService.registerUsernameCurrentValue;
    this._authService
      .generateMailOTP(username!, otpType)
      .subscribe((mailOTPResponse) => {
        this._progressSpinnerService.next(false);
        const { data, statusCode } = mailOTPResponse;
        if (mailOTPResponse != null) {
          if (statusCode === 500) {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Lỗi khởi tạo mã xác thực',
                message: data,
              }
            );
          } else if (statusCode === 201) {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Yêu cầu gửi lại thành công',
                message: data,
              }
            );
          }
        }
      });
  }
  ngOnDestroy(): void {
    this._authService.nextUsername(null);
  }
}
