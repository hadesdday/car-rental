
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/customer/services/auth.service';
import { UserService } from 'src/app/customer/services/user.service';
import { RedirectInfo } from 'src/app/models/model';
import { CustomerLoginDialogComponent } from '../../../../customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { I18NextService } from 'angular-i18next';

@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent {
  @ViewChild('dropdownMenuButton')
  dropdownMenuButton!: ElementRef;
  @ViewChild('notifyMenuButton')
  notifyMenuButton!: ElementRef;
  activeUserMenu: boolean = false;
  activeNotification: boolean = false;
  userMenus: RedirectInfo[] = [
    {
      label: this.i18nextService.t('header.account')?.toString() || "",
      path: '/account',
    },
    {
      label: this.i18nextService.t('header.favoriteCar')?.toString() || "",
      path: '/my-favs',
    },
    {
      label: this.i18nextService.t('header.myCar')?.toString() || "",
      path: '',
    },
    {
      label: this.i18nextService.t('header.myTrip')?.toString() || "",
      path: '/my-trip',
    },
    {
      label: this.i18nextService.t('header.myAddress')?.toString() || "",
      path: '',
    },
    {
      label: this.i18nextService.t('header.promotion')?.toString() || "",
      path: '/promo',
    },
    {
      label: this.i18nextService.t('header.changePassword')?.toString() || "",
      path: '',
    },
  ];
  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private i18nextService: I18NextService
  ) { }
  openLoginFormDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CustomerLoginDialogComponent, {
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (this.dropdownMenuButton) {
      if (
        this.dropdownMenuButton.nativeElement.contains(event.target) &&
        this.activeUserMenu === false
      ) {
        this.activeUserMenu = true;
      } else {
        this.activeUserMenu = false;
      }
    }
    if (this.notifyMenuButton) {
      if (
        this.notifyMenuButton.nativeElement.contains(event.target) &&
        this.activeNotification === false
      ) {
        this.activeNotification = true;
      } else {
        this.activeNotification = false;
      }
    }
  }
  onClickSignOut() {
    let refreshToken = this._authService.getRefreshToken();
    if (refreshToken) {
      this._authService
        .signOut(refreshToken)
        .pipe(
          tap((response) => {
            const { data, statusCode } = response;
            if (statusCode === 200) {
              alert(this.i18nextService.t("message.logoutSuccess"));
              this._authService.nexAccessToken(null);
              this._authService.removeRefreshToken();
              this.userService.nextUser(null);
              this._router.navigate(['/home'])
            }
          })
        )
        .subscribe();
    }
  }
}
