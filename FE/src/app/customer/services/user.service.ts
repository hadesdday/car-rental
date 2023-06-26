import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { UserDTO } from 'src/app/models/model';
import { UpdatedUserRequest } from 'src/app/models/request/model';
import { APIResponse } from 'src/app/models/response/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userBehaviorSubject!: BehaviorSubject<UserDTO | null>
  public user$!: Observable<UserDTO | null>
  constructor(private _httpClient: HttpClient) {
    this.userBehaviorSubject = new BehaviorSubject<UserDTO | null>(null)
    this.user$ = this.userBehaviorSubject.asObservable()
    this.user$.subscribe(v => console.log(v));
  }
  public nextUser(user: UserDTO | null){
    this.userBehaviorSubject.next(user)
  }
  get userValue(): UserDTO | null {
    return this.userBehaviorSubject.value
  }
  public updateUser(updatedUserRequest: UserDTO): Observable<APIResponse<string>> {
    // updatedUserRequest.dob = new Date(updatedUserRequest.dob)
    let url = URL_API.concat(`/api/user/update`);
    return this._httpClient.post<APIResponse<string>>(url, updatedUserRequest, {
      responseType: 'json',
    });
  }
}
