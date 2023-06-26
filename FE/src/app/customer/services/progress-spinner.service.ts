import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  private isActiveBSub: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public isActive$: Observable<boolean> = this.isActiveBSub.asObservable()
  constructor() {
    this.isActive$.subscribe(v => console.log("Spinner " + v))
  }
  next(value: boolean) {
    this.isActiveBSub.next(value)
  }
}
