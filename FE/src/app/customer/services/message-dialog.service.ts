import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private _matDialog: MatDialog) { }
  openMessageDialog(
    component: ComponentType<any>,
    data: any
  ): MatDialogRef<any> {
    return this._matDialog.open(component, {
      minWidth: '500px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: data,
    });
  }
}
