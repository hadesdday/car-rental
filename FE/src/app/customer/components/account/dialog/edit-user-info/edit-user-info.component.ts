import { tap } from 'rxjs';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/customer/services/user.service';
import { GENDER } from 'src/app/models/enum';
import { UpdatedUserRequest } from 'src/app/models/request/model';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { UserDTO } from 'src/app/models/model';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { DateAdapter } from 'angular-calendar';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss'],
})
export class EditUserInfoComponent {
  updatedUserFG!: FormGroup;
  genderOptions = [
    {
      label: 'Nam',
      value: 'MALE',
    },
    {
      label: 'Nữ',
      value: 'FEMALE',
    },
  ];
  user!: UserDTO;
  constructor(
    private _messageDialogService: MessageDialogService,
    private _matDialogRef: MatDialogRef<EditUserInfoComponent>,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this.user = this._userService.userValue!;
    console.log(this.user);

    this.updatedUserFG = this._fb.group({
      fullName: [this.user.fullName, Validators.required],
      gender: [this.user.gender, Validators.required],
      dob: [new Date(this.user.dob), Validators.required],
    });
    this.updatedUserFG.valueChanges.subscribe((v) => console.log(v));
  }
  onClickUpdateUser(formValue: UserDTO) {
    let updatedUserRequest: UserDTO = { ...this.user, ...formValue };
    this._userService
      .updateUser(updatedUserRequest)
      .pipe(
        tap((response) => {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            this.user = updatedUserRequest;
            this._userService.nextUser(this.user);
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Thành công',
                message: data,
              }
            );
            this._matDialogRef.close();
          } else {
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Thất bại',
                message: data,
              }
            );
          }
        })
      )
      .subscribe();
  }
}
