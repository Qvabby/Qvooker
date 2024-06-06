import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //constructor and dependency injection
  constructor(private authService: AccountService) { }
  //intereceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }
}

//HTTP interceptor is used to automatically add the authorization token to outgoing HTTP requests.
//It is useful because we use JWT token. (and need to know if user is logged in or not on api side.)
