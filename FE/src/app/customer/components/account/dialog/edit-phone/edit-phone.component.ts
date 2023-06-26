import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { UserService } from 'src/app/customer/services/user.service';
import { EditUserInfoComponent } from '../edit-user-info/edit-user-info.component';
import { UpdatedUserRequest } from 'src/app/models/request/model';
import { UserDTO } from 'src/app/models/model';
import { tap } from 'rxjs';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.scss'],
})
export class EditPhoneComponent {
  phoneControl: FormControl = new FormControl('', Validators.required);
  user: any;
  constructor(
    private _messageDialogService: MessageDialogService,
    private _matDialogRef: MatDialogRef<EditPhoneComponent>,
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this.user = this._userService.userValue;
  }
  updatePhone(phone: string) {
    let updateUserRequest: UserDTO = { ...this.user, phone };
    this._userService
      .updateUser(updateUserRequest)
      .pipe(
        tap((response) => {
          const { statusCode, data } = response;
          if (statusCode === 200) {
            this.user = updateUserRequest;
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
