import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/customer/services/auth.service';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { passwordValidator, matchingPasswordsValidator } from '../../sign-up/sign-up.component';
import { ForgetPasswordRequest } from 'src/app/models/request/model';
import { tap } from 'rxjs';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent {
  changePasswordFG!: FormGroup;
  username!: string
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _matDialog: MatDialog,
    public progressBarService: ProgressBarService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _messageDialogService: MessageDialogService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    if(data.username){
      this.username = data.username
    }else{
      this._router.navigate(['/home'])
    }
    this.changePasswordFG = this._fb.group(
      {
        password: [
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ],
      },
      {
        validators: matchingPasswordsValidator('password', 'confirmPassword'),
      }
    );
    this.changePasswordFG.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
  get passwordControl(): FormControl {
    return this.changePasswordFG.get('password') as FormControl;
  }
  get confirmPasswordControl(): FormControl {
    return this.changePasswordFG.get('confirmPassword') as FormControl;
  }
  submitChangePassword(value: any){
    let forgetPasswordRequest: ForgetPasswordRequest = {
      username: this.username,
      newPassword: value.password
    }
    this._authService.changePassword(forgetPasswordRequest).pipe(tap(response => {
      const {data, statusCode } = response
      if(statusCode == 200){
        let messageDialogRef = this._messageDialogService.openMessageDialog(MessageDialogComponent, {
          title: "Thành công",
          message: data,
          navigatePages: ['close','login'],
        })
        messageDialogRef.afterClosed().subscribe(_ => {
          this.dialogRef.close()
          this._router.navigate(['/home'])
        })
      }else{
        this._messageDialogService.openMessageDialog(MessageDialogService, {
          title: "Không thành công",
          message: data,
          navigatePages: ['close'],
        })
      }
    })).subscribe()
  }
}
