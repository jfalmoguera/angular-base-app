import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorLogService } from '../services/error-log.service';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
    constructor(private errorLogService: ErrorLogService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    const elapsed = Date.now() - started;
                    console.log(`Request for ${req.urlWithParams} took ${elapsed} ms.`);
                }
            }),
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    this.errorLogService.logError(error);
                    return throwError(error);
                }
            })
        );
    }
}
