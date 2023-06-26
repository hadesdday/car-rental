import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET_ALL_BRAND, GET_ALL_CAR, GET_ALL_CAR_STATUSES, GET_ALL_SERVICE_TYPES, GET_MODEL_BY_BRAND, UPDATE_CAR_ADMIN } from 'src/app/models/constance';
import { CarAdminRequest } from 'src/app/models/request/model';
import { BrandResponse, CarModelResponse, IdNameResponse, RegisteredCarDto } from 'src/app/models/response/model';

@Injectable({
  providedIn: 'root'
})
export class RegisteredCarService {

  constructor(private httpClient: HttpClient) { }
  getBrands(): Observable<BrandResponse[]> {
    return this.httpClient.get<BrandResponse[]>(`${GET_ALL_BRAND}`);
  }

  getModelsByBrandId(id: number): Observable<CarModelResponse[]> {
    return this.httpClient.get<CarModelResponse[]>(`${GET_MODEL_BY_BRAND}/${id}`);
  }

  getServiceTypes(): Observable<IdNameResponse[]> {
    return this.httpClient.get<IdNameResponse[]>(`${GET_ALL_SERVICE_TYPES}`);
  }

  getCarStatues(): Observable<String[]> {
    return this.httpClient.get<String[]>(`${GET_ALL_CAR_STATUSES}`);
  }

  getAll(): Observable<RegisteredCarDto[]> {
    return this.httpClient.get<RegisteredCarDto[]>(`${GET_ALL_CAR}`);
  }

  updateCar(car: CarAdminRequest) {
    return this.httpClient.put(`${UPDATE_CAR_ADMIN}`, car);
  }
}
