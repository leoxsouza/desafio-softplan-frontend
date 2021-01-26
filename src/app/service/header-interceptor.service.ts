import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  constructor() { }

  processaError(error: HttpErrorResponse) {
    let trace = error.error.trace;
    return throwError(trace);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const tokenRequest = req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa("meta:meta"))
    });

    return next.handle(tokenRequest).pipe(
      catchError(this.processaError)
    )
  }


}
