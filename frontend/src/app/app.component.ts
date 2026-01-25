import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- IMPRESCINDIBLE
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // <--- Añadimos RouterLinkActive

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule], 
  template: `
  <nav class="bg-gray-900 text-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <a routerLink="/" class="text-2xl font-bold tracking-wider text-indigo-400 cursor-pointer">NESIA</a>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a routerLink="/" 
               routerLinkActive="text-indigo-400" 
               [routerLinkActiveOptions]="{exact: true}"
               class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Inicio</a>
            
            <a routerLink="/servicios" 
               routerLinkActive="text-indigo-400"
               class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Servicios</a>
            
            <a routerLink="/nosotros" 
               routerLinkActive="text-indigo-400"
               class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">Quiénes Somos</a>
            
            <a routerLink="/contacto" 
               class="ml-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-sm font-bold transition cursor-pointer">RESERVAR CITA</a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <main>
    <router-outlet></router-outlet>
  </main>

  <footer class="bg-gray-800 text-gray-400 py-6 text-center text-sm">
    &copy; 2026 Nesia Auto Detail Pro. Todos los derechos reservados.
  </footer>
  `,
  styles: []
})
export class AppComponent { // <--- DEBE LLAMARSE EXACTAMENTE ASÍ
  title = 'Nesia';
}