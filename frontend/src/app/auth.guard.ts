import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Leemos la señal reactiva del AuthService que creamos antes
  // Si devuelve true (porque hay un token JWT guardado), le abrimos la puerta
  if (authService.isAdmin()) {
    return true;
  } else {
    // Si no hay token, le bloqueamos el paso y lo mandamos al login (o al inicio)
    router.navigate(['/login']);
    return false;
  }
};