import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../customer/services/auth.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jwt = this.authService.getAccessTokenCurrentValue()
        if(jwt){
            let accessToken = jwt.token
            const cloned = req.clone({
                headers: req.headers.set("Authorization", 'Bearer ' + accessToken)
                
            })
            console.log(req.headers);
            return next.handle(cloned);
        }else{
            return next.handle(req)
        }
    }
}