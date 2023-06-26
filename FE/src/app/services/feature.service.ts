import { Injectable } from '@angular/core';
import { FeatureRequest } from '../models/request/model';
import { Observable } from 'rxjs';
import { URL_API } from '../models/constance';
import { APIResponse } from '../models/response/model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private _httpClient: HttpClient) {}
  public addFeature(formData: FormData): Observable<APIResponse<string>> {
    let url = URL_API.concat(`/api/features/add`);
    return this._httpClient.post<APIResponse<string>>(url, formData);
  }
}
