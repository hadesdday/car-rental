import { Component, HostListener, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationExtras } from '@angular/router';
import { EditDrivingLicenseComponent } from '../account/dialog/edit-driving-license/edit-driving-license.component';
import { EditEmailComponent } from '../account/dialog/edit-email/edit-email.component';
import { EditPhoneComponent } from '../account/dialog/edit-phone/edit-phone.component';
import { EditUserInfoComponent } from '../account/dialog/edit-user-info/edit-user-info.component';
import { ProfileQrComponent } from './dialog/profile-qr/profile-qr.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isSltEditCover: boolean = false
  @ViewChild('editCoverBtn')
  editCoverBtn!: MatButton
  constructor(private matDialog: MatDialog, private router: Router){

  }
  openEditPhoneDialog(){
    this.matDialog.open(EditPhoneComponent, {
      maxWidth: 'auto;',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
  openEditEmailDialog(){
    this.matDialog.open(EditEmailComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
  openEditLicenseDialog(){
    this.matDialog.open(EditDrivingLicenseComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
  openEditUserInfoDialog(){
    this.matDialog.open(EditUserInfoComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
  navigateCarDetail(){
    const navigationExtras: NavigationExtras = {
      state: {
        routeBy: 'bar'
      }
    }
    this.router.navigate(['car/huy/123'], navigationExtras);
  }
  openQrCode(){
    this.matDialog.open(ProfileQrComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms'
    })
  }
  // @HostListener('document:click', ['$event'])
  // clickOut(event: any) {
  //   if(this.editCoverBtn._elementRef.nativeElement.contains(event.target) && this.isSltEditCover === false){
  //     this.isSltEditCover = true
  //   }else{
  //     this.isSltEditCover = false
  //   }
  // }
}
