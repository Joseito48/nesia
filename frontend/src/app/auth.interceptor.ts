import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos el token en el almacenamiento del navegador
  let token = null;
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('adminToken');
  }

  // 2. Si hay token, clonamos la petición original y le inyectamos la cabecera
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // Enviamos la petición modificada al backend
    return next(authReq);
  }

  // 3. Si no hay token (usuario anónimo), la petición sigue su curso normal
  return next(req);
};