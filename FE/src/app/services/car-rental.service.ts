import { Injectable } from '@angular/core';
import { UserTripResponse } from '../models/response/model';
import { Observable } from 'rxjs';
import { URL_API } from '../models/constance';
import { HttpClient } from '@angular/common/http';
import { BookingRequest } from '../models/request/model';

@Injectable({
  providedIn: 'root'
})
export class CarRentalService {

  constructor(private _httpClient: HttpClient) { }

  public findUserTrip(
    userId: number
  ): Observable<UserTripResponse> {
    let url = URL_API.concat(`/api/rentals/${userId}`);
    return this._httpClient.get<UserTripResponse>(url, {
      responseType: 'json',
    });
  }
  public bookCar(bookRequest: BookingRequest): Observable<boolean>{
    let url = URL_API.concat(`/api/rentals/`);
    return this._httpClient.post<boolean>(url, bookRequest, {
      responseType: 'json',
    });
  }
}
