import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <--- Verifica que el nombre sea AppComponent

bootstrapApplication(AppComponent, appConfig) // <--- Aquí debe decir AppComponent
  .catch((err) => console.error(err));