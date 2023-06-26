import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SD_MODE, WD_MODE } from 'src/app/models/constance';

interface FilterOption {
  label: string;
  value: string;
}
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FilterComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  sltServiceType: string = SD_MODE;

  serviceTypes: FilterOption[] = [
    {
      label: 'Tự lái',
      value: SD_MODE,
    },
    {
      label: 'Có tài xế',
      value: WD_MODE,
    },
  ];
  @Input()
  type!: string;
  timeOptions: FilterOption[] = [
    {
      label: 'Thời gian đặt',
      value: '',
    },
    {
      label: 'Thời gian khởi hành',
      value: '',
    },
  ];
  tripOptions: FilterOption[] = [
    {
      label: 'Chuyến thuê',
      value: '',
    },
    {
      label: 'Chuyến cho thuê',
      value: '',
    },
  ];
  statusOptions: FilterOption[] = [
    {
      label: 'Chờ duyệt',
      value: '',
    },
    {
      label: 'Đã duyệt',
      value: '',
    },
    {
      label: 'Đã đặt cọc',
      value: '',
    },
    {
      label: 'Đã kết s',
      value: '',
    },
  ];
}
