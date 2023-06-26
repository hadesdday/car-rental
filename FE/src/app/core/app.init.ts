import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../customer/services/auth.service';
import { debounce, debounceTime, delay, of, tap } from 'rxjs';
import { UserService } from '../customer/services/user.service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { MessageDialogService } from '../customer/services/message-dialog.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

export function appInitializer(
    authService: AuthService,
    cookieService: CookieService,
    userService: UserService,
    progressSpinnerService: ProgressSpinnerService,
    messageDialogService: MessageDialogService
) {
    return () => {
        const haveToken: boolean = cookieService.check('refresh-token');
        if (haveToken) {
            progressSpinnerService.next(true);
            const refreshToken = cookieService.get('refresh-token');
            console.log(refreshToken);
            return authService.refreshAccessToken(refreshToken).pipe(
                debounceTime(2000),
                tap((authenticationResponse) => {
                    progressSpinnerService.next(false);
                    const { data, statusCode } = authenticationResponse;
                    if (statusCode === 200) {
                        userService.nextUser(data.user);
                        authService.nexAccessToken(data.accessToken);
                        authService.storeRefreshToken(data.refreshToken);
                    } else {
                        messageDialogService.openMessageDialog(MessageDialogComponent, {
                            title: 'Hết phiên',
                            message: data,
                        });
                        authService.removeRefreshToken();
                    }
                })
            );
        } else {
            return of(null);
        }
    };
}
