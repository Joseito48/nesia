Markdown
# 🚗 Nesia AutoDetail - Full-Stack App

Una aplicación web completa (Frontend + Backend) diseñada para la gestión de un negocio premium de detallado de vehículos. Permite a los clientes visualizar el catálogo de servicios y solicitar citas, mientras que los administradores pueden gestionar el catálogo mediante un CRUD seguro y conectado a la nube.

## 🚀 Tecnologías Utilizadas

El proyecto está construido bajo una arquitectura moderna separada en dos repositorios/carpetas principales:

### Frontend (Cliente)
* **Framework:** Angular 18+ (Componentes Standalone).
* **Reactividad:** Signals de Angular (Sustituyendo a RxJS clásico donde es posible).
* **Estilos:** Tailwind CSS (Paleta personalizada en tonos azul y gris/zinc).
* **Peticiones HTTP:** `HttpClient` con interceptión de Tokens JWT/Bearer.

### Backend (Servidor & API)
* **Framework:** NestJS (Node.js con TypeScript).
* **Base de Datos:** MongoDB (gestionado con Mongoose).
* **Almacenamiento de Medios:** Cloudinary (CDN para optimización y guardado de imágenes).
* **Documentación API:** Swagger (OpenAPI).
* **Testing:** Jest (Pruebas unitarias integradas).

---

## ✨ Características Principales

1.  **Catálogo Dinámico:** Los servicios se obtienen en tiempo real desde MongoDB.
2.  **Panel de Administrador Seguro:** Rutas protegidas mediante un `AuthGuard` personalizado.
3.  **Gestión de Imágenes en la Nube:** Subida directa a Cloudinary desde el panel de administrador, garantizando tiempos de carga rápidos y un rendimiento óptimo.
4.  **Sistema de Reservas:** Formulario modal responsivo para la captación de clientes.

---

## 🛠️ Instalación y Configuración Local

Si deseas clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

### 1. Backend (NestJS)
Abre una terminal y navega a la carpeta del backend:
```bash
cd backend
npm install
Asegúrate de configurar tus variables de entorno (MongoDB URI, credenciales de Cloudinary). Luego, arranca el servidor:

Bash
npm run start:dev
(El servidor se ejecutará por defecto en el puerto http://localhost:3000)

2. Frontend (Angular)
Abre otra terminal y navega a la carpeta del frontend:

Bash
cd frontend
npm install
Arranca la aplicación cliente:

Bash
ng serve
(La web estará disponible en http://localhost:4200)

📚 Documentación de la API (Swagger)
El backend incluye una interfaz interactiva de Swagger para visualizar y probar todos los endpoints disponibles.

Con el backend en ejecución, visita:
👉 http://localhost:3000/docs

Endpoints Principales:
GET /servicios - Obtiene el catálogo público.

POST /servicios - Crea un nuevo servicio (🔒 Requiere Auth).

DELETE /servicios/:id - Elimina un servicio (🔒 Requiere Auth).

POST /servicios/upload - Sube la imagen a Cloudinary (🔒 Requiere Auth).

GET /reservas - Obtiene la lista de citas (🔒 Requiere Auth).

POST /reservas - Crea una nueva cita (Público).

🧪 Pruebas Automáticas (Testing)
Este proyecto incluye pruebas unitarias para garantizar la calidad y estabilidad de la lógica de negocio en el lado del servidor.

Para ejecutar la suite de pruebas:

Bash
cd backend
npm run test
Esto validará la correcta inyección de dependencias y el funcionamiento esperado de los Controladores y Servicios (ej. servicios.service.spec.ts).

Desarrollado con ❤️ para el proyecto final del ciclo Full-Stack.
