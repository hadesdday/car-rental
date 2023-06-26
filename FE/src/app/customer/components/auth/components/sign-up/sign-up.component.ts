import jwt_decode from 'jwt-decode';

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  timer,
  tap,
  timeout,
  delay,
  concatMap,
  of,
  Observable,
  switchMap,
} from 'rxjs';
import { CustomerLoginDialogComponent } from 'src/app/customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
import { AuthService } from '../../../../services/auth.service';
import { NUMBER_REGEX, TEXT_SPACE_REGEX } from 'src/app/models/constance';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ProgressBarService } from '../../../../services/progress-bar.service';
import { Router } from '@angular/router';
import { OAuthProvider, OTPType } from 'src/app/models/enum';
import { SignUpRequest, SocialUserRequest } from 'src/app/models/request/model';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import {
  APIResponse,
  AuthenticationResponse,
  SocialUserResponse,
} from 'src/app/models/response/model';
import { UserService } from 'src/app/customer/services/user.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
export function matchingPasswordsValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control: FormControl = formGroup.controls[controlName] as FormControl;
    const matchingControl: FormControl = formGroup.controls[
      matchingControlName
    ] as FormControl;

    // set error on matching control if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ notMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value) {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
  return null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [ProgressBarService],
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('signUp')
  signUpEleRef!: ElementRef;
  isSuccessSignUp = false;
  signUpFG!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _matDialog: MatDialog,
    public progressBarService: ProgressBarService,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    private _userService: UserService
  ) {
    this.signUpFG = this._fb.group(
      {
        username: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ],
        confirmPassword: [
          '',
          Validators.compose([Validators.required, passwordValidator]),
        ],
        fullName: ['', Validators.compose([Validators.required])],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(NUMBER_REGEX),
          ]),
        ],
      },
      {
        validators: matchingPasswordsValidator('password', 'confirmPassword'),
      }
    );
  }
  ngOnInit(): void {
    this._authService.loadGoogleClientLibs();
    (window as any).signInWithGoogleCallback =
      this.signInWithGoogleCallback.bind(this);
  }
  ngAfterViewInit(): void {}
  get usernameControl(): FormControl {
    return this.signUpFG.get('username') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signUpFG.get('password') as FormControl;
  }
  get confirmPasswordControl(): FormControl {
    return this.signUpFG.get('confirmPassword') as FormControl;
  }
  get fullNameControl(): FormControl {
    return this.signUpFG.get('fullName') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.signUpFG.get('phone') as FormControl;
  }

  onClickSignUp(signUpFormValue: SignUpRequest) {
    this.progressBarService.next(true);
    this._authService
      .validateSignUp(signUpFormValue)
      .pipe(
        switchMap((validateSignUpResponse) => {
          if (
            validateSignUpResponse.statusCode === 409 ||
            validateSignUpResponse.statusCode === 400
          ) {
            this.progressBarService.next(false);
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              {
                title: 'Thông tin không hợp lệ',
                message: validateSignUpResponse.data,
              }
            );
            return of(null);
          } else if (validateSignUpResponse.statusCode === 200) {
            let otpType: OTPType = OTPType.REGISTER;
            return this._authService.generateMailOTP(
            this.usernameControl.value,
              otpType
            );
          }
          return of(null);
        }),
        tap((mailOTPResponse) => {
          this.progressBarService.next(false);
          if (mailOTPResponse != null) {
            if (mailOTPResponse.statusCode === 500) {
              this._matDialog.open(MessageDialogComponent, {
                minWidth: '500px',
                enterAnimationDuration: '500ms',
                exitAnimationDuration: '500ms',
                data: {
                  title: 'Lỗi khởi tạo mã xác thực',
                  message: mailOTPResponse.data,
                },
              });
            } else if (mailOTPResponse.statusCode === 201) {
              this._authService.nextUsername(this.usernameControl.value);
              this._router.navigate([`/validate-otp/register`]);
            }
          }
        })
      )
      .subscribe();
  }
  signInWithGoogleCallback(response: any) {
    this._authService.signInWithGoogleCallback(response);
  }
  signInWithFacebook(): void {
    this._authService.signInWithFacebook();
  }
  openSignInDialog(){
    this._matDialog.open(CustomerLoginDialogComponent)
  }
  ngOnDestroy() {}
}
