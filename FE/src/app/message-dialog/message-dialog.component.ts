import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerLoginDialogComponent } from '../customer/components/auth/components/dialogs/customer-login-dialog/customer-login-dialog.component';
export type PageType = "login" | "home"
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent implements OnInit{
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _route: Router,
    private _matDialog: MatDialog,
    private _dialogRef: MatDialogRef<MessageDialogComponent>
  ) {

  }
  ngOnInit(): void {
  }
  openLoginDialog(){
    let loginDialogRef = this._matDialog.open(CustomerLoginDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
    });
    loginDialogRef.afterClosed().subscribe(_ => {
      this._route.navigate(['/home'])
      this._dialogRef.close()
    })
  }
}
