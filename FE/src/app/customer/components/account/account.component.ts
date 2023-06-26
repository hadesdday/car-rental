import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { EditDrivingLicenseComponent } from './dialog/edit-driving-license/edit-driving-license.component';
import { EditEmailComponent } from './dialog/edit-email/edit-email.component';
import { EditPhoneComponent } from './dialog/edit-phone/edit-phone.component';
import { EditUserInfoComponent } from './dialog/edit-user-info/edit-user-info.component';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/model';
import { UserService } from '../../services/user.service';
import { GENDER } from 'src/app/models/enum';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  isSltEditCover: boolean = false
  @ViewChild('editCoverBtn')
  editCoverBtn!: MatButton
  user$!: Observable<UserDTO | null>
  constructor(private matDialog: MatDialog, private router: Router, private _userService: UserService){
    this.user$ = this._userService.user$
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
      exitAnimationDuration: '500ms',
    })
  }
  openEditLicenseDialog(){
    this.matDialog.open(EditDrivingLicenseComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      height: '100vh'
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
  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if(this.editCoverBtn._elementRef.nativeElement.contains(event.target) && this.isSltEditCover === false){
      this.isSltEditCover = true
    }else{
      this.isSltEditCover = false
    }
  }
}
