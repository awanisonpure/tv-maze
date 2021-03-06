import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.router.navigate(['page-not-found']);
        return throwError(error);
      }));
  }
}
