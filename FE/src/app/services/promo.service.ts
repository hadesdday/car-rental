import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from '../models/constance';
import { PromoDTO, UserDTO } from '../models/model';
import { APIResponse } from '../models/response/model';
import { HttpClient } from '@angular/common/http';
import { NewPromoRequest } from '../models/request/model';

@Injectable({
  providedIn: 'root',
})
export class PromoService {
  constructor(private _httpClient: HttpClient) {}
  public addNewPromo(
    newPromoRequest: NewPromoRequest
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/promo/add`);
    return this._httpClient.post<APIResponse<string>>(url, newPromoRequest, {
      responseType: 'json',
    });
  }
  public updatePromo(
    updatedPromo: PromoDTO
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/promo/update`);
    return this._httpClient.post<APIResponse<string>>(url, updatedPromo, {
      responseType: 'json',
    });
  }
  public removePromo(
    promoId: number
  ): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/promo/remove/${promoId}`);
    return this._httpClient.get<APIResponse<string>>(url, {
      responseType: 'json',
    });
  }
  public findAllAvailable() {
    let url = URL_API.concat(`/api/promo/available-all`);
    return this._httpClient.get<APIResponse<PromoDTO[]>>(url, {
      responseType: 'json',
    });
  }
  public findAll(){
    let url = URL_API.concat(`/api/promo/all`);
    return this._httpClient.get<APIResponse<PromoDTO[]>>(url, {
      responseType: 'json',
    });
  }
}
