import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
//  Punto de entrada para la aplicación Angular en modo server-side rendering (SSR), aquí se configura el bootstrap de la aplicación utilizando el componente raíz App y la configuración específica para SSR definida en app.config.server.ts
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
