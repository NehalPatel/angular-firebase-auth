import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, tap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1), // Take the first emitted value (user or null)
    map(user => !!user), // Convert to boolean
    tap(loggedIn => {
      if (!loggedIn) {
        // Redirect to login page if not authenticated
        router.navigate(['/login']);
      }
    })
  );
};
