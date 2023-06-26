import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_ALL_STAT } from 'src/app/models/constance';
import { CarChartDataRequest } from 'src/app/models/request/model';
import { CarOwnerChartResponse } from 'src/app/models/response/model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };

  constructor(private httpClient: HttpClient) { }

  getAdminChartData(request: CarChartDataRequest): Observable<CarOwnerChartResponse[]> {
    return this.httpClient.post<CarOwnerChartResponse[]>(`${GET_ALL_STAT}`, request);
  }
}
