import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit-driving-license',
  templateUrl: './edit-driving-license.component.html',
  styleUrls: ['./edit-driving-license.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditDrivingLicenseComponent {
  constructor(private httpClient: HttpClient){

  }
  
}
