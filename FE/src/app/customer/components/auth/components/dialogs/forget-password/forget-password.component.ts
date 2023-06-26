import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concatMap, of, tap } from 'rxjs';
import { AuthService } from 'src/app/customer/services/auth.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { OTPType } from 'src/app/models/enum';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  usernameControl: FormControl = new FormControl('', Validators.required);
  constructor(
    public progressBarService: ProgressBarService,
    public progressSpinnerService: ProgressSpinnerService,
    private _authService: AuthService,
    private _messageDialogService: MessageDialogService,
    private _router: Router,
    private _matDialogRef: MatDialogRef<ForgetPasswordComponent>
  ) {}
  submitUsername(username: string) {
    this.progressSpinnerService.next(true)
    this._authService
      .checkActivatedUser(username)
      .pipe(
        concatMap((response) => {
          const { data, statusCode } = response;
          if (statusCode === 200) {
            return this._authService.generateMailOTP(
              username,
              OTPType.FORGET_PASSWORD
            );
          } else if (statusCode === 403 || statusCode === 400) {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Thông tin không hợp lệ',
                message: data,
              }
            );
            return of(null);
          } else {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Lỗi',
                message: 'Lỗi hệ thống. Vui lòng đăng nhập sau',
              }
            );
            return of(null);
          }
        }),
        tap((mailOTPResponse) => {
          this.progressSpinnerService.next(false)
          if (mailOTPResponse) {
            const { data, statusCode } = mailOTPResponse;
            this.progressBarService.next(false);
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
                this._matDialogRef.close({ data: statusCode });
                this._authService.nextUsername(username);
                this._router.navigate([`/validate-otp/forget-password`]);
              }
            }
          }
        })
      )
      .subscribe();
  }
}
