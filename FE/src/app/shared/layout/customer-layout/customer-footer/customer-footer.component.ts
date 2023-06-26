import { Component, Inject } from '@angular/core';
import { I18NEXT_SERVICE, I18NextService, ITranslationService } from 'angular-i18next';
import { RedirectInfo } from 'src/app/models/model';


@Component({
  selector: 'app-customer-footer',
  templateUrl: './customer-footer.component.html',
  styleUrls: ['./customer-footer.component.scss']
})
export class CustomerFooterComponent {
  constructor(private i18nextService: I18NextService,
    @Inject(I18NEXT_SERVICE) private iTranslationService: ITranslationService) {
  }
  policies: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.introduction')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.termsAndConditions')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.operationsRules')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.security')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.disputeResolution')?.toString() || "",
      path: ''
    },
  ]
  infoMores: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.generalManual')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.bookingGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.ownerGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.paymentGuide')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.career')?.toString() || "",
      path: ''
    },
  ]
  partners: RedirectInfo[] = [
    {
      label: this.i18nextService.t('footer.registerOwner')?.toString() || "",
      path: ''
    },
    {
      label: this.i18nextService.t('footer.insuranceRegister')?.toString() || "",
      path: ''
    },
  ]

  language = 'vi';
  languages: string[] = ['en', 'vi'];

  ngOnInit() {
    this.iTranslationService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.iTranslationService.language);
      }
    });
  }

  changeLanguage(lang: string) {
    if (lang !== this.iTranslationService.language) {
      this.iTranslationService.changeLanguage(lang).then(x => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }
}
