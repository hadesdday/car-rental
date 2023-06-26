import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  I18NEXT_SERVICE,
  I18NextModule,
  I18NextTitle,
  ITranslationService,
} from 'angular-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';

export function appInit(i18next: ITranslationService) {
  return () =>
    i18next
      .use(HttpApi)
      .use(I18nextBrowserLanguageDetector)
      .init({
        supportedLngs: ['en', 'vi'],
        fallbackLng: 'vi',
        debug: true, // set to false to clear console output
        returnEmptyString: false,
        ns: ['translation'],
        defaultNS: 'translation',
        ignoreJSONStructure: true,
        interpolation: {
          escapeValue: false,
          format: (value, format, locale) => {
            // Customize the currency formatting based on the locale and format
            if (format === 'currency') {
              return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: 'VND',
              }).format(value);
            }
            return value;
          },
        },
        keySeparator: '.',
        nsSeparator: false,
        backend: {
          loadPath: 'assets/locales/{{lng}}.{{ns}}.json',
        },
        // lang detection plugin options
        detection: {
          // order and from where user language should be detected
          order: ['querystring', 'cookie'],
          // keys or params to lookup language from
          lookupCookie: 'lang',
          lookupQuerystring: 'lng', // lng is a param in the url ex: (?lng=vi) will set languague to vietnamese
          // cache user language on
          caches: ['localStorage', 'cookie'],
          // optional expire and domain for set cookie
          cookieMinutes: 10080, // 7 days
        },
      });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true,
  },  
  {
    provide: Title,
    useClass: I18NextTitle,
  },
  { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' },
  // {
  //   provide: LOCALE_ID,
  //   deps: [I18NEXT_SERVICE],
  //   useFactory: localeIdFactory
  // },
  // { provide: LOCALE_ID, useValue: 'vi' }
];

@NgModule({
  declarations: [AppComponent, MessageDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAngularModule,
    HttpClientModule,
    CoreModule,
    ToastrModule.forRoot(),
    I18NextModule.forRoot(),
  ],
  providers: [I18N_PROVIDERS, { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
