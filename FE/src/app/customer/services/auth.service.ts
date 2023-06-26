declare const FB: any;
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { URL_API } from 'src/app/models/constance';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delay,
  delayWhen,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { OAuthProvider, OTPType } from 'src/app/models/enum';
import {
  APIResponse,
  AuthenticationResponse,
  SocialUserResponse,
} from 'src/app/models/response/model';
import {
  SignInRequest,
  SignUpRequest,
  ForgetPasswordRequest,
  SocialUserRequest,
} from 'src/app/models/request/model';
import { JWTDTO, UserDTO } from 'src/app/models/model';
import { CookieService } from 'ngx-cookie-service';
import { log } from 'console';
import { ProgressSpinnerService } from './progress-spinner.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit, OnDestroy {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
    params: new HttpParams(),
  };
  private usernameBSub!: BehaviorSubject<string | null>;
  username$!: Observable<string | null>;
  private accessTokenBehaviorSubject!: BehaviorSubject<JWTDTO | null>;
  accessToken$!: Observable<JWTDTO | null>;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _userService: UserService,
    private _router: Router,
  ) {
    this.usernameBSub = new BehaviorSubject<string | null>(null);
    this.username$ = this.usernameBSub.asObservable();

    this.accessTokenBehaviorSubject = new BehaviorSubject<JWTDTO | null>(null);
    this.accessToken$ = this.accessTokenBehaviorSubject.asObservable();
    this.initFB()
  }
  ngOnDestroy(): void { }
  ngOnInit(): void { }
  private initFB() {
    FB.init({
      appId: '1262109928077227',
      cookie: true,
      xfbml: true,
      version: 'v11.0',
    });
  }
  public nextUsername(username: string | null) {
    this.usernameBSub.next(username);
  }
  public nexAccessToken(jwt: JWTDTO | null) {
    this.accessTokenBehaviorSubject.next(jwt);
  }
  public getAccessTokenCurrentValue() {
    return this.accessTokenBehaviorSubject.value;
  }
  get registerUsernameCurrentValue() {
    return this.usernameBSub.value;
  }
  public getRefreshToken() {
    return this.cookieService.get('refresh-token');
  }
  public removeRefreshToken() {
    return this.cookieService.delete('refresh-token');
  }
  public signIn(
    signInRequest: SignInRequest
  ): Observable<APIResponse<AuthenticationResponse | string>> {
    let url = URL_API.concat('/api/auth/sign-in');
    return this.httpClient.post<APIResponse<AuthenticationResponse | string>>(
      url,
      signInRequest,
      this.httpOptions
    );
  }
  signOut(refreshToken: string): Observable<APIResponse<string>> {
    return this.httpClient
      .post<APIResponse<string>>(
        `${URL_API}/api/auth/revoke-token`,
        refreshToken,
        this.httpOptions
      )
      .pipe();
  }
  storeRefreshToken(refreshToken: JWTDTO) {
    const { token, tokenExpirationDate } = refreshToken;
    this.cookieService.set(
      'refresh-token',
      token,
      tokenExpirationDate,
      '/',
      undefined,
      true,
      'Strict'
    );
  }

  refreshAccessToken(
    refreshToken: string
  ): Observable<APIResponse<AuthenticationResponse>> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + refreshToken);
    const url = `${URL_API}/api/auth/refresh-access-token`;
    return this.httpClient
      .get<APIResponse<AuthenticationResponse>>(url, {
        headers: headers
      })
      .pipe();
  }

  public validateSignUp(
    signUpFormRequest: SignUpRequest
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/auth/validate-sign-up');
    return this.httpClient.post<APIResponse<string>>(
      url,
      signUpFormRequest,
      this.httpOptions
    );
  }
  public generateMailOTP(
    username: string,
    OTPType: OTPType
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/otp/generate-otp');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('username', username)
      .set('otpType', OTPType);
    return this.httpClient.get<APIResponse<string>>(url, {
      headers: headers,
      params: params,
      responseType: 'json',
    });
  }
  public validateMailOTP(
    username: string,
    OTPNumber: number,
    OTPType: OTPType
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat('/api/otp/validate-otp');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('username', username)
      .set('OTPNumber', OTPNumber)
      .set('otpType', OTPType);
    return this.httpClient
      .get<APIResponse<string>>(url, {
        headers: headers,
        params: params,
        responseType: 'json',
      })
      .pipe(delay(500));
  }
  public checkActivatedUser(username: string): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/auth/check-activated-user`);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<APIResponse<string>>(url, username, {
      headers: headers,
      responseType: 'json',
    });
  }
  public changePassword(
    forgetPasswordRequest: ForgetPasswordRequest
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/auth/change-password`);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post<APIResponse<string>>(
      url,
      forgetPasswordRequest,
      {
        headers: headers,
        responseType: 'json',
      }
    );
  }
  // SSO
  public signInWithSocial(
    socialUser: SocialUserRequest
  ): Observable<APIResponse<AuthenticationResponse | string>> {
    let url = URL_API.concat('/api/auth/social-sign-in');
    return this.httpClient
      .post<APIResponse<AuthenticationResponse | string>>(
        url,
        socialUser,
        this.httpOptions
      )
      .pipe(
        delayWhen((_) => timer(3000)),
        tap((signInResponse) => {
          if (signInResponse) {
            const { statusCode } = signInResponse;
            if (statusCode == 200) {
              const { data } =
                signInResponse as APIResponse<AuthenticationResponse>;
              signInResponse as APIResponse<AuthenticationResponse>;
              this._progressSpinnerService.next(false);
              this._userService.nextUser(data.user);
              this.nexAccessToken(data.accessToken);
              this.storeRefreshToken(data.refreshToken);
              this._router.navigate(['/home']);
            }
          }
        })
      );
  }
  signInWithGoogleCallback(response: any) {
    this._progressSpinnerService.next(true);
    const credential = response.credential;
    const decodedToken: any = jwt_decode(credential);
    const socialUserRequest: SocialUserRequest = {
      email: decodedToken.email,
      firstName: decodedToken.family_name,
      lastName: decodedToken.given_name,
      name: decodedToken.name,
      photoUrl: decodedToken.picture,
      provider: OAuthProvider.GOOGLE,
      id: decodedToken.sub,
    };
    this.signInWithSocial(socialUserRequest).subscribe();
  }
  signInWithFacebook() {
    this._progressSpinnerService.next(true);
    FB.login(
      (response: any) => {
        // handle the response
        if (response.status === 'connected') {
          const accessToken = response.authResponse.accessToken;
          const userID = response.authResponse.userID;
          FB.api(
            `/${userID}`,
            'GET',
            { access_token: accessToken, fields: 'name,email,picture' },
            (user: any) => {
              const { email, id, name, picture } = user;
              const socialUserRequest: SocialUserRequest = {
                email: email,
                name: name,
                photoUrl: picture.data.url,
                provider: OAuthProvider.FACEBOOK,
                id: id,
              };
              this.signInWithSocial(socialUserRequest).subscribe();
            }
          );
        } else {
        }
      },
      { scope: 'email' }
    );
  }
  public loadGoogleClientLibs() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  public getCurUsername() {
    return this.usernameBSub.value
  }
}
