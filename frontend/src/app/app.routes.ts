import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { AboutComponent } from './about/about.components';
import { AdminComponent } from './admin/admin.component' ;
import { GaleriaComponent } from './galeria/galeria.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Página principal (vacía)
  { path: 'servicios', component: ServiciosComponent }, // URL /servicios
  { path: 'nosotros', component: AboutComponent }, //URL/Nosotros
  {path: 'galeria', component: GaleriaComponent}, //URL/galeria
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: '' } // Si la ruta no existe, vuelve al inicio
]