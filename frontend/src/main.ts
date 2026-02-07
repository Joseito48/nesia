import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <--- Importar el componente raíz
//  Punto de entrada para la aplicación Angular, aquí se configura el bootstrap de la aplicación utilizando el componente raíz AppComponent y la configuración definida en app.config.ts
bootstrapApplication(AppComponent, appConfig) 
  .catch((err) => console.error(err));