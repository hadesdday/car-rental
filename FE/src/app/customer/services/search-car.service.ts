import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SEARCH_CAR } from 'src/app/models/constance';
import { SearchCarResponse } from 'src/app/models/response/model';

@Injectable({
  providedIn: 'root'
})
export class SearchCarService {

  constructor(private httpClient: HttpClient) { }

  searchCar(data: any): Observable<SearchCarResponse[]> {
    return this.httpClient.post<SearchCarResponse[]>(`${SEARCH_CAR}`, data);
  }
}
