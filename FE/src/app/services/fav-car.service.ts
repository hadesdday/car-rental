import { Injectable } from '@angular/core';
import { URL_API } from '../models/constance';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CarResponse } from '../models/response/model';

@Injectable({
  providedIn: 'root'
})
export class FavCarService {
  constructor(private _httpClient: HttpClient) { }
  public findAll(userId: number){
    let url = URL_API.concat(`/api/fav-cars/${userId}`);
    return this._httpClient.get<CarResponse[]>(url, {
      responseType: 'json',
    });
  }
  public addFavCar(
    carid: number,
    userId: number
  ): Observable<boolean> {
    let url = URL_API.concat(`/api/fav-cars/${carid}/user/${userId}`);
    return this._httpClient.post<boolean>(url, null, {
      responseType: 'json',
    });
  }
  public removeFavCar(
    carid: number,
    userId: number
  ): Observable<boolean> {
    let url = URL_API.concat(`/api/fav-cars/${carid}/user/${userId}`);
    return this._httpClient.delete<boolean>(url, {
      responseType: 'json',
    });
  }
}
