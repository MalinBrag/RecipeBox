import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/api/auth.service';
import { map, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  
  return auth.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/sign-in']);
      }
    }),
    map(isLoggedIn => isLoggedIn)
  );
};
