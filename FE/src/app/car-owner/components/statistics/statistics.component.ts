import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import Chart from 'chart.js/auto';
import { CarOwnerService } from '../../services/car-owner.service';
import { CarOwnerStatResponse } from 'src/app/models/response/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { endOfMonth, startOfMonth } from 'date-fns';
import { CarOwnerChartDataRequest } from 'src/app/models/request/model';
import { UserService } from 'src/app/customer/services/user.service';
import { I18NextService } from 'angular-i18next';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  chart: any;

  now = new Date();
  username!: string;

  stats_information: CarOwnerStatResponse = {
    avgRating: 0,
    totalRevenue: 0,
    totalRental: 0,
    totalCar: 0,
    acceptedRentalRating: 0,
    cancelRentalRating: 0
  };


  constructor(private _formBuilder: FormBuilder, private carOwnerService: CarOwnerService, private userService: UserService, private i18nextService: I18NextService) {
    this.userService.user$.subscribe(v => {
      this.username = (v?.username!);
    });
  }

  ngOnInit(): void {
    this.createChart();
    //test user only
    this.carOwnerService.getAllStatByOwner(this.username).subscribe(res => {
      this.stats_information = res;
    });
    this.fetchData();

  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar',
      // data: {
      //   labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
      //     '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
      //   datasets: [
      //     {
      //       label: "Doanh thu",
      //       data: ['1234567', '1234569', '1234967', '1239567', '1934567',
      //         '1234967', '1239567', '1244567'],
      //     }
      //   ]
      // },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        showTooltips: true,
        scales: {
          y: {
            ticks: {
              // @ts-ignore
              beginAtZero: true,
              callback: function (value: any) {
                if (parseInt(value) >= 100000) {
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
                } else {
                  return value;
                }
              }
            },
          }
        },
      }
    });
  }

  dateRangeFormGroup = this._formBuilder.group({
    fromDate: new FormControl(startOfMonth(this.now)),
    toDate: new FormControl(endOfMonth(this.now)),
    option: ['0']
  });

  fetchData() {
    const option = Number(this.dateRangeFormGroup.get('option')?.value);
    const request: CarOwnerChartDataRequest = {
      username: this.username, // test only
      startDate: Number(this.dateRangeFormGroup.value.fromDate?.getTime()),
      endDate: Number(this.dateRangeFormGroup.value.toDate?.getTime()),
      category: option
    }

    this.carOwnerService.getChartData(request).subscribe(res => {
      this.chart.data = {
        labels: res.map(item => item.month + "/" + item.year),
        datasets: [
          {
            label: option === 0 ? this.i18nextService.t("statistics.revenue") : this.i18nextService.t("statistics.totalRental"),
            data: res.map(item => item.value),
          }
        ]
      };
      this.chart.update();
    })
  }

  getMoneyFormat(value: number) {
    return getMoneyFormat(value);
  }

}
