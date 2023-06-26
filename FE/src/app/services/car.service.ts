import { Observable } from 'rxjs';
import { CarDTO } from '../models/model';
import { CarResponse } from '../models/response/model';
import { FilterRequest } from './../models/request/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_API } from '../models/constance';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private _httpClient: HttpClient) {}

  public findAllCar(
    ownerId: number,
    filterRequest: FilterRequest,
    
  ): Observable<CarResponse[]> {
    let url = URL_API.concat(`/api/cars/${ownerId}`);
    return this._httpClient.post<CarResponse[]>(url, filterRequest, {
      responseType: 'json',
    });
  }
  public findFeaturesCars(serviceTypeId: number): Observable<CarResponse[]> {
    let url = URL_API.concat(`/api/cars/feature/service-type/${serviceTypeId}`);
    return this._httpClient.get<CarResponse[]>(url, {
      responseType: 'json',
    });
  }
  public findOne(
    carId: number,
    userId: number | null,
    startTime: number,
    endTime: number,
    promoId?: number
  ): Observable<CarResponse> {
    let params = new HttpParams();
      params = params
        .set('startTime', startTime)
        .set('endTime', endTime);
      if(userId){
        params = params.set("userId", userId)
      }
      if(promoId){
        params = params.set("promoId", promoId)
      }
    let url = URL_API.concat(`/api/cars/detail/${carId}`);
    return this._httpClient.get<CarResponse>(url, {
      params: params,
      responseType: 'json',
    });
  }
}
