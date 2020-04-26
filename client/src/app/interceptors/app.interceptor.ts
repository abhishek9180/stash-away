import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators';
import { AppService } from '../app.service';


@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  tokenDetails: any;
  constructor(private router: Router, private appService: AppService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add request headers
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });

    return next.handle(request).pipe(catchError((error, caught) => {
      // intercept the respons error and displace it to the console
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  /**
* manage errors
* @param err
* @returns {any}
*/
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    let errorMessage = "Something went wrong!"
    if (err.error.description) {
      errorMessage = err.error.message;
    }
    this.appService.showToast(errorMessage, true);

    if (err.status === 401) {
      // navigate /delete cookies or whatever
      this.router.navigate(['/login']);
    }
    throw err;
  }
}
