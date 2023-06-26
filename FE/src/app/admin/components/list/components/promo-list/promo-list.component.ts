import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { log } from 'console';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PromoDTO } from 'src/app/models/model';
import { PromoService } from 'src/app/services/promo.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { tap } from 'rxjs';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPromoDialogComponent } from './eidt-promo-dialog/eidt-promo-dialog.component';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.scss'],
})
export class PromoListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'id',
    'title',
    'quantity',
    'status',
    'discountPercent',
    'maxPrice',
    'startDate',
    'endDate',
    'action',
  ];
  dataSource!: MatTableDataSource<PromoDTO>;
  constructor(
    private _promoService: PromoService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    private _matDialog: MatDialog
  ) {
    this._promoService.findAll().subscribe((response) => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  removePromo(promoId: number) {
    this._progressSpinnerService.next(true);
    this._promoService
      .removePromo(promoId)
      .pipe(
        tap((response) => {
          this._progressSpinnerService.next(false);
          const { data, statusCode } = response;
          let currDateSource = this.dataSource.data;
          this.dataSource.data = currDateSource.filter(
            (row) => row.id !== promoId
          );
          if (statusCode === 200) {
            let dataDialog = {
              title: 'Thành công',
              message: data,
            };
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
          } else {
            let dataDialog = {
              title: 'Thất bại',
              message: data,
            };
            this._messageDialogService.openMessageDialog(
              MessageDialogComponent,
              dataDialog
            );
          }
        })
      )
      .subscribe();
  }
  editPromo(promo: PromoDTO) {
    let editDialogRef = this._matDialog.open(EditPromoDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        promo,
      },
    });
    editDialogRef.afterClosed().subscribe((response) => {
      console.log(response.updatedPromo)
      if(response.updatedPromo){
        let currDataSource = this.dataSource.data;
        let updatedPromo: PromoDTO = response.updatedPromo;
        let index = currDataSource.findIndex((row) => row.id === updatedPromo.id);
        currDataSource[index] = updatedPromo;
        this.dataSource.data = currDataSource;
      }
    });
  }
}
