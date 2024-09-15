import { HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthService } from './AuthService/auth.service';
import { inject } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { Observable } from 'rxjs';

export function AuthHttpInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const authService: AuthService = inject(AuthService);

  return authService.user.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${user.getToken}`),
      });

      return next(modifiedReq);
    })
  );
}
