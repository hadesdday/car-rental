import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegisteredCarService } from 'src/app/admin/services/registered-car.service';
import { RegisteredCarDto } from 'src/app/models/response/model';
import { EditRegisteredCarDialogComponent } from './edit-registered-car-dialog/edit-registered-car-dialog.component';
import { CarStatus, CarStatusVie } from 'src/app/models/enum';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

@Component({
  selector: 'app-registered-car-listing',
  templateUrl: './registered-car-listing.component.html',
  styleUrls: ['./registered-car-listing.component.scss']
})

export class RegisteredCarListingComponent {
  displayedColumns: string[] = ['id', 'createdDate', 'color', 'plate', 'price', 'brand', 'model', 'serviceType', 'status', 'actions'];
  dataSource!: MatTableDataSource<RegisteredCarDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  carStatuses = {
    key: Object.keys(CarStatusVie),
    value: Object.values(CarStatusVie)
  };

  constructor(private _matDialog: MatDialog, private service: RegisteredCarService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
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

  editCar(car: RegisteredCarDto) {
    let editDialogRef = this._matDialog.open(EditRegisteredCarDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        car
      },
    });
    editDialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let currDataSource = this.dataSource.data;
        let updatedCar: RegisteredCarDto = response.updatedCar;
        let index = currDataSource.findIndex((row) => row.id === updatedCar.id);
        currDataSource[index] = updatedCar;
        this.dataSource.data = currDataSource;
      }
    });
  }

  findCarStatusVie(status: string) {
    return this.carStatuses.value[this.carStatuses.key.findIndex((value: any) => value === status)];
  }

  getDateInFormat(date: Date): string {
    return format(new Date(date), "dd/MM/yyyy", { locale: vi });
  }

  getStatusClassname(status: CarStatus) {
    switch (status) {
      case CarStatus.BANNED:
        return "suspend";
      case CarStatus.PENDING_APPROVAL:
        return "pending";
      case CarStatus.ACTIVE:
        return "active";
      case CarStatus.BUSY:
        return "busy";
      case CarStatus.RENTED:
        return "rented";
      default:
        return "";
    }
  }
}
