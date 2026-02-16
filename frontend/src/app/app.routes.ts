import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { AboutComponent } from './about/about.components';
import { AdminComponent } from './admin/admin.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard'; // <--- 1. IMPORTANTE: Importamos el Guardián

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal
  { path: 'login', component: LoginComponent }, // Página de Login
  { path: 'servicios', component: ServiciosComponent },
  { path: 'nosotros', component: AboutComponent },
  { path: 'galeria', component: GaleriaComponent },
  
  // RUTA PROTEGIDA
  { 
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [authGuard] // <--- 2. IMPORTANTE: Esto activa la seguridad
  },

  { path: '**', redirectTo: '' } // Si la ruta no existe, vuelve al inicio
];