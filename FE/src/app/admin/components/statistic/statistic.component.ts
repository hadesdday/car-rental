import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { endOfMonth, startOfMonth } from 'date-fns';
import { CarChartDataRequest } from 'src/app/models/request/model';
import { getMoneyFormat } from 'src/app/shared/utils/MoneyUtils';
import { StatisticService } from '../../services/statistic.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent {
  chart: any;

  now = new Date();
  constructor(private _formBuilder: FormBuilder, private statService: StatisticService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart();
    this.fetchData();
  }

  createChart() {
    this.chart = new Chart("MyAdminChart", {
      type: 'bar',
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
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND";
              }
            },
          }
        }
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
    const request: CarChartDataRequest = {
      startDate: Number(this.dateRangeFormGroup.value.fromDate?.getTime()),
      endDate: Number(this.dateRangeFormGroup.value.toDate?.getTime()),
      category: option
    }

    this.statService.getAdminChartData(request).subscribe(res => {
      this.chart.data = {
        labels: res.map(item => item.month + "/" + item.year),
        datasets: [
          {
            label: option === 0 ? "Doanh thu" : "Tổng số chuyến",
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
