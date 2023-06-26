import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { appInitializer } from './app.init';
import { AuthService } from '../customer/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../customer/services/user.service';
import { JWTInterceptor } from './jwt.interceptor';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { MessageDialogService } from '../customer/services/message-dialog.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService, CookieService, UserService, ProgressSpinnerService, MessageDialogService],
    },
  ]
})
export class CoreModule { }
