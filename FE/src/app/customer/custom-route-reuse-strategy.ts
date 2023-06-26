import {
    RouteReuseStrategy,
    DetachedRouteHandle,
    ActivatedRouteSnapshot,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    private routeStore = new Map<string, DetachedRouteHandle>();
    private count = 0
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const path = route.routeConfig?.path;
        return path != undefined && ['car','filter' ].includes(path);
        // return true to path will not be destroyed while leaving.
    }
    store(
        route: ActivatedRouteSnapshot,
        handle: DetachedRouteHandle | null
    ): void {
        const path = route.routeConfig!.path;
        if (handle != null) {
            this.routeStore.set(route.routeConfig!.path + '', handle);
        }
        // after shouldDetach called, we stored component of path (route path from which we are leaving)
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = route.routeConfig!.path;
        return (
            path != undefined &&
            ['car','filter' ].includes(path) &&
            !!this.routeStore.get(path)
        );
        //This method is used to determine whether the component that we are trying to load should be re-used ( instead of creating it newly) or not
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const path = route.routeConfig?.path;
      
        if (path) {
            const storeDetachedRouteHandle = this.routeStore.get(path);
            if (storeDetachedRouteHandle) {
                console.log(storeDetachedRouteHandle);
                return storeDetachedRouteHandle;
            } else {
                return null;
            }
        } else {
            return null;
        }
        // When shouldAttach returns true means, this method will be called
        // and here we need to retrieve and return the component instance (DetachedRouteHandle) which we have stored in the store() method for this route path ( we can access the path using ActivatedRouteSnapshot param.
    }
    shouldReuseRoute(
        future: ActivatedRouteSnapshot,
        curr: ActivatedRouteSnapshot
    ): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
