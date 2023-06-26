import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { RentalDetailsResponse } from 'src/app/models/response/model';
import { RentalDetailsComponent } from '../details.component';
import { tap, catchError } from 'rxjs';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { UserService } from 'src/app/customer/services/user.service';

interface DialogData {
  title: string;
  content: string;
  type: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  rental!: RentalDetailsResponse;
  dialog_data!: DialogData;
  username!: string;

  constructor(private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<RentalDetailsComponent>,
    private carOwnerService: CarOwnerService, private userService: UserService) {
    this.rental = data.rental;
    this.dialog_data = data.dialog;
    this.userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  onCancelAction() {
    this.matDialogRef.close();
  }

  onAcceptAction() {
    switch (this.dialog_data.type) {
      case "accept":
        this.acceptRental();
        break;
      case "reject":
        this.rejectRental();
        break;
      case "complete":
        this.completeRental();
        break;
      case "delivered":
        this.confirmDeliveredCarToRenter();
        break;
    }
  }

  acceptRental() {
    this._progressSpinnerService.next(true);               //test user
    this.carOwnerService.acceptRental(this.rental.id, this.username)
      .pipe(
        tap((res) => {
          this._progressSpinnerService.next(false);

          if (res != null) {
            let dataDialog = {
              title: "Thành công",
              message: "Bạn đã chấp nhận yêu cầu thuê xe thành công"
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            setTimeout(() => {
              messageDialogRef.close();
            }, 3000);
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ data: true });
            });
          } else {
            let dataDialog = {
              title: "Thất bại",
              message: "Không thể thực hiện hành động"
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

  rejectRental() {
    this._progressSpinnerService.next(true);               //test user
    this.carOwnerService.rejectRental(this.rental.id, this.username)
      .pipe(
        tap((res) => {
          this._progressSpinnerService.next(false);

          if (res != null) {
            let dataDialog = {
              title: "Thành công",
              message: "Bạn đã từ chối yêu cầu thuê xe thành công"
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            setTimeout(() => {
              messageDialogRef.close();
            }, 3000);
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ data: true });
            });
          } else {
            let dataDialog = {
              title: "Thất bại",
              message: "Không thể thực hiện hành động"
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

  completeRental() {
    this._progressSpinnerService.next(true);               //test user
    this.carOwnerService.completeRental(this.rental.id, this.username)
      .pipe(
        tap((res) => {
          this._progressSpinnerService.next(false);

          if (res != null) {
            let dataDialog = {
              title: "Thành công",
              message: "Bạn đã hoàn thành yêu cầu thuê xe thành công"
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            setTimeout(() => {
              messageDialogRef.close();
            }, 3000);
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ data: true });
            });
          } else {
            let dataDialog = {
              title: "Thất bại",
              message: "Không thể thực hiện hành động"
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

  confirmDeliveredCarToRenter() {
    this._progressSpinnerService.next(true);               //test user
    this.carOwnerService.confirmDeliveredCarToRenter(this.rental.id, this.username)
      .pipe(
        tap((res) => {
          this._progressSpinnerService.next(false);

          if (res != null) {
            let dataDialog = {
              title: "Thành công",
              message: "Bạn đã xác nhận đã giao xe cho khách hàng thành công"
            };
            let messageDialogRef = this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
            setTimeout(() => {
              messageDialogRef.close();
            }, 3000);
            messageDialogRef.afterClosed().subscribe((_) => {
              this.matDialogRef.close({ data: true });
            });
          } else {
            let dataDialog = {
              title: "Thất bại",
              message: "Không thể thực hiện hành động"
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
}
