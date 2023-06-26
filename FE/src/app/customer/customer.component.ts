import { Component } from '@angular/core';
import { ProgressSpinnerService } from './services/progress-spinner.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  constructor(public progressSpinnerService: ProgressSpinnerService){}
}
