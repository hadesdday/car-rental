
import { log } from 'console';
import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { ProgressSpinnerService } from './customer/services/progress-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  title = 'cdjava-fe-booking-oto';
  constructor(public progressSpinnerService: ProgressSpinnerService){}
}
