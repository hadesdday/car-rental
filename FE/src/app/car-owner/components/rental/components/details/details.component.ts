import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { differenceInDays, differenceInMilliseconds, format, formatDuration, intervalToDuration } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { interval, takeWhile, timer } from 'rxjs';
import { CarOwnerService } from 'src/app/car-owner/services/car-owner.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { CAR_IMG } from 'src/app/models/constance';
import { RentalStatus, RentalStatusVie } from 'src/app/models/enum';
import { RentalDetailsResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { I18NextService } from 'angular-i18next';
import { UserService } from 'src/app/customer/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RentalDetailsComponent {
  username!: string;
  constructor(
    private route: ActivatedRoute,
    private service: CarOwnerService,
    private _messageDialogService: MessageDialogService,
    private _matDialog: MatDialog,
    private i18nextService: I18NextService,
    private userService: UserService
  ) {
    this.userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  rental_id!: number;
  duration: any;
  locale: any;
  targetDate!: Date;
  timeLeft!: string;
  rental_details!: RentalDetailsResponse;
  readonly BASE_IMG = CAR_IMG;

  rentalStatus = {
    key: Object.keys(RentalStatusVie),
    value: Object.values(RentalStatusVie)
  };

  @ViewChild('stepper') stepper!: MatStepper;
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rental_id = params['id'];
    });

    this.getRentalDetailsData();

  }

  getStepperSelectedIndex() {
    switch (this.rental_details?.status) {
      case RentalStatus.ACCEPTED:
        return 1;
      case RentalStatus.RENTED:
        return 2;
      case RentalStatus.COMPLETED:
        return 3;
      default:
        return 0;
    }
  }

  getRentalDetailsData() {
    this.service.getRentalDetailsById(this.rental_id).subscribe(res => {
      this.rental_details = res;

      const TWO_HOURS_IN_MS = 2 * 60 * 60 * 1000;

      if (this.rental_details.status === RentalStatus.PENDING) {
        this.targetDate = new Date(this.rental_details.createdDate + TWO_HOURS_IN_MS);

        const timeLeftTimer = interval(1000);
        timeLeftTimer
          .pipe(
            takeWhile(() => this.getDiffInMs() > 0, true)
          )
          .subscribe(() => {
            const diffInMs = this.getDiffInMs();
            const duration = intervalToDuration({ start: 0, end: diffInMs });
            this.timeLeft = formatDuration(duration, { locale: vi, delimiter: " , " });

            if (diffInMs <= 0) {
              this.timeLeft = this.i18nextService.t("common.expired")?.toString() || "";
              let dataDialog = {
                title: this.i18nextService.t("common.failed"),
                message: this.i18nextService.t("error.expiredRental"),
              };
              this._messageDialogService.openMessageDialog(
                MessageDialogComponent,
                dataDialog
              );
              this.service.rejectRental(this.rental_id, this.username).subscribe(res => {
                console.log("reject status", res);

              });
              timer(3000).subscribe(() => {
                window.location.href = '/car-owner/rental-listing';
              })
            }
          });
      }
      for (let i = 0; i < this.getStepperSelectedIndex(); i++) {
        this.stepper.next();
      }
    });
  }

  getDiffInMs() {
    const now = new Date();
    const diffInMs = differenceInMilliseconds(this.targetDate, now);
    return diffInMs;
  }

  formatMoney(money: number) {
    return getMoneyFormat(money);
  }

  getFormattedDate(date: number) {
    return format(new Date(date), "dd/MM/yyyy hh:mm", { locale: vi });
  }

  gtAcceptedRental() {
    return this.rentalStatus.key.indexOf(this.rental_details.status) >= this.rentalStatus.key.indexOf(RentalStatus.ACCEPTED)
  }

  getRentalStatus(status: RentalStatus) {
    return this.rentalStatus.value[this.rentalStatus.key.indexOf(status)];
  }

  calculateDateDiff(date1: number, date2: number) {
    return differenceInDays(date2, date1);
  }

  calculateTotalPrice(dateDiff: number, price: number) {
    return dateDiff * price;
  }

  getStatusClassname(status: RentalStatus) {
    switch (status) {
      case RentalStatus.CANCELLED:
        return "cancelled";
      case RentalStatus.REJECTED:
        return "cancelled";
      case RentalStatus.PENDING:
        return "pending";
      case RentalStatus.ACCEPTED:
        return "rented";
      case RentalStatus.RENTED:
        return "rented";
      case RentalStatus.COMPLETED:
        return "completed";
    }
  }

  isPending() {
    return this.rental_details?.status === RentalStatus.PENDING;
  }

  isAccepted() {
    return this.rental_details?.status === RentalStatus.ACCEPTED;
  }

  isRented() {
    return this.rental_details?.status === RentalStatus.RENTED;
  }

  isSoonerThanEndDate() {
    console.log(this.rental_details.endDate > new Date().getTime());

    return this.rental_details.endDate > new Date().getTime();
  }

  onDeclineRentalRequest() {
    let confirmationDialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        rental: this.rental_details,
        dialog: {
          title: this.i18nextService.t("common.rejectRequest"),
          content: this.i18nextService.t("rentalDetails.rejectRentalContentConfirmation"),
          type: "reject"
        }
      },
    });
    confirmationDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.getRentalDetailsData();
      }
    });
  }

  onAcceptRentalRequest() {
    let confirmationDialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        rental: this.rental_details,
        dialog: {
          title: this.i18nextService.t("rentalDetails.acceptRentalTitle"),
          content: this.i18nextService.t("rentalDetails.acceptRentalConfirmation"),
          type: "accept"
        }
      },
    });
    confirmationDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.getRentalDetailsData();
      }
    });
  }

  onConfirmDeliveredCarToRenter() {
    let confirmationDialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        rental: this.rental_details,
        dialog: {
          title: this.i18nextService.t("rentalDetails.confirmDelivery"),
          content: this.i18nextService.t("rentalDetails.confirmDeliveryContent"),
          type: "delivered"
        }
      },
    });
    confirmationDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.getRentalDetailsData();
      }
    });
  }

  onCompleteRental() {
    let confirmationDialogRef = this._matDialog.open(ConfirmationDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        rental: this.rental_details,
        dialog: {
          title: this.i18nextService.t("rentalDetails.confirmCompletedRental"),
          content: this.i18nextService.t("rentalDetails.confirmCompletedRentalContent"),
          type: "complete"
        }
      },
    });
    confirmationDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.getRentalDetailsData();
      }
    });
  }

  getRoundedRating(rating: number) {
    return Math.round(rating);
  }


}
