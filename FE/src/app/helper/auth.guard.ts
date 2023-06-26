import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, delay, tap } from 'rxjs';
import { UserService } from '../customer/services/user.service';
import { MessageDialogService } from '../customer/services/message-dialog.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { AuthService } from '../customer/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _messageDialogService: MessageDialogService,
    private _cookieService: CookieService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
        console.log("aaaa")
    if (this._userService.userValue) {
      return true;
    } else {
      this._messageDialogService
        .openMessageDialog(MessageDialogComponent, {
          title: 'Từ chối truy cập',
          message: 'Bạn không thể truy cập trang này khi chưa đăng nhập',
        })
        .afterClosed()
        .subscribe((_) => this._router.navigate(['/home']));
      return false;
    }
  }
}
