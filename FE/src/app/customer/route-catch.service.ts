import { Injectable } from '@angular/core';
import { DetachedRouteHandle } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';

@Injectable({
  providedIn: 'root'
})
export class RouteCatchService {
  private routeHandles = new Map<string, DetachedRouteHandle>();
   preComponent!: SearchResultComponent
  addRouteHandle(path: string, handle: DetachedRouteHandle): void {
    this.routeHandles.set(path, handle);
  }

  getRouteHandle(path: string): DetachedRouteHandle | undefined {
    return this.routeHandles.get(path);
  }

  clear(): void {
    this.routeHandles.clear();
  }
}
