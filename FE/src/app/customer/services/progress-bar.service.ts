import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressBarService {
  private isActiveBSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isActive$: Observable<boolean> = this.isActiveBSub.asObservable()
  constructor() {
  }
  next(value: boolean){
    this.isActiveBSub.next(value)
  }
}
