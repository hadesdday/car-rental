import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-qr',
  templateUrl: './profile-qr.component.html',
  styleUrls: ['./profile-qr.component.scss']
})
export class ProfileQrComponent {
  qrDataUrl!: string 
  constructor(){
    this.qrDataUrl = "https://www.facebook.com/daquyyyy"
  }
  qrWidth: number = 512
  zoomIn(){
    this.qrWidth += 50 
  }
  zoomOut(){
    this.qrWidth -= 50 
  }
}
