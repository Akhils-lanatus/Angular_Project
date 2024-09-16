import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/AuthService/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  return authService.user.pipe(
    map((user) => {
      console.log(user);

      return user ? true : router.createUrlTree(['auth', 'login']);
    })
  );
};
