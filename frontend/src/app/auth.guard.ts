import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verificamos si estamos en el navegador (para evitar errores de servidor)
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    
    if (token === 'true') {
      return true; // Permitir acceso
    }
  }

  // Si no hay token o no es navegador, redirigir al login
  router.navigate(['/login']);
  return false;
};