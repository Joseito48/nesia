import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 
import { provideClientHydration } from '@angular/platform-browser';
// 1. Añadimos withInterceptors a la importación
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
// 2. Importamos tu interceptor
import { authInterceptor } from './auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    // 3. Encadenamos ambas funciones dentro del proveedor HTTP
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    )
  ]
};