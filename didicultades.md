Aquí tienes una propuesta de **Diario de Desarrollo** redactada en primera persona, estructurada para que ocupe el equivalente a unas dos páginas y lista para que la incluyas en la memoria de tu proyecto. Recoge fielmente todas las fases, decisiones técnicas y retos a los que nos hemos enfrentado.

---

# Diario de Desarrollo: Proyecto Full-Stack "Nesia AutoDetail"

## Día 1: Definición de Arquitectura y Configuración del Frontend
El primer paso del proyecto fue establecer una base sólida para el Frontend. Decidí utilizar **Angular** en su versión más reciente, aprovechando la arquitectura de componentes *Standalone* y el nuevo sistema de reactividad con *Signals*. Esta decisión técnica me permitió tener un código mucho más limpio y evitar la complejidad de los módulos tradicionales (`NgModules`).

Para el diseño, opté por **Tailwind CSS**. La decisión se basó en la agilidad que proporciona al aplicar estilos directamente en el HTML mediante clases utilitarias. Durante este día, desarrollé la estructura principal: el `Home`, el catálogo de `Servicios` y el `Navbar`. Inicialmente, utilicé una paleta de colores basada en tonos *índigo*, aunque más adelante el diseño evolucionaría para adaptarse mejor a la identidad corporativa de la marca.

## Día 2: Desarrollo del Backend y Estrategia de Almacenamiento (Cloudinary)
Una de las decisiones arquitectónicas más importantes la tomé al plantear el CRUD de servicios. En lugar de guardar las imágenes de los coches directamente en la base de datos de **MongoDB** (lo cual la sobrecargaría y ralentizaría la aplicación) o en el almacenamiento local del servidor de **NestJS**, decidí integrar **Cloudinary**. 

Esta decisión técnica mejoró significativamente el rendimiento, ya que Cloudinary actúa como un CDN (Content Delivery Network), optimizando las imágenes al vuelo. La dificultad principal este día fue sincronizar la subida: tuve que programar el frontend para que primero enviara la imagen mediante `FormData`, esperara la URL segura devuelta por Cloudinary, y finalmente enviara el objeto JSON completo (con título, precio y URL) a MongoDB. Logré implementar la "C" (Crear) del CRUD con éxito desde un panel de administrador.

## Día 3: Completando el CRUD y Resolución de Bugs (Troubleshooting)
Este fue uno de los días más intensos a nivel de depuración de código. Tras conseguir guardar servicios, procedí a implementar la lectura (GET) y el borrado (DELETE) en el Panel de Administrador. La visualización en tabla mediante Signals fue fluida, pero al intentar borrar un servicio me encontré con un error en la consola: `404 Not Found - Cannot DELETE /servicios/...`.

**Dificultad técnica:** Inicialmente pensé que el ID del objeto de MongoDB (`_id`) no se estaba enviando correctamente. Sin embargo, tras analizar la pestaña *Network* del navegador, descubrí que la petición sí llegaba al backend. El problema residía en el controlador de NestJS (`servicios.controller.ts`), donde había olvidado definir el decorador `@Delete(':id')`. Una vez añadida esta "puerta de entrada", la conexión fluyó perfectamente.

Ese mismo día me enfrenté a otro clásico error de desarrollo: `EADDRINUSE: address already in use :::3000`. Al guardar cambios rápidamente, los procesos de Node se solaparon. Lo solucioné matando el proceso del puerto 3000 mediante consola (`npx kill-port`), entendiendo mejor cómo gestiona NestJS los reinicios automáticos en entorno de desarrollo.

## Día 4: Implementación de Seguridad y Pruebas Unitarias
Con el CRUD funcional, el siguiente reto era la seguridad. Ocultar los botones de borrado en el HTML no era suficiente, ya que cualquier usuario avanzado podría forzar una petición HTTP. 

**Decisión técnica (Seguridad):** Implementé un `AuthGuard` en el backend (NestJS). Este "portero" intercepta las peticiones y verifica si en los *Headers* viaja un token de autorización válido (`Bearer`). Tuve que modificar el servicio de Angular (`servicios.service.ts`) para que leyera el token almacenado en el `localStorage` (generado tras el login) y lo adjuntara en cada petición POST y DELETE. Dejé la ruta GET pública para que los clientes pudieran ver el catálogo.

Para cumplir con los estándares de calidad del proyecto, ejecuté las pruebas automáticas unitarias (Testing) integradas por defecto en NestJS mediante Jest (`npm run test`). Superar las pruebas en verde (`PASS`) confirmó que la lógica del controlador y los servicios funcionaba correctamente.

## Día 5: Refinamiento de UI/UX, Logo estático y Control de Versiones (Git)
En la recta final, me centré en el aspecto visual y el despliegue. 

**Dificultad de Diseño:** La paleta índigo inicial no terminaba de encajar con el logo real de "Nesia", que utilizaba tonos negros, grises y azules. Utilicé herramientas de refactorización rápida en Visual Studio Code para migrar las clases de Tailwind (`indigo-` a `blue-` y `zinc-`). Además, tomé la decisión de subir el logo oficial también a Cloudinary y enlazarlo de forma estática en el `Navbar` mediante la etiqueta `<img>` y la clase `object-contain`, en lugar de cargar una imagen local, mejorando los tiempos de carga iniciales.

**Gestión de Repositorio:** El último gran reto fue con Git. Al hacer pruebas de diseño, quise descartar y recuperar cambios en varias ocasiones. Utilicé `git stash` para guardar cambios en memoria y `git stash pop` para recuperarlos sin perder trabajo. También me aseguré de limpiar la caché generada por Angular (`.angular/cache`) para no subir archivos basura al repositorio. Finalmente, con un código limpio y funcionando, realicé el último `git push origin main`, dando por concluido el desarrollo Full-Stack del proyecto. 

## Día 6: Auditoría, Documentación de API y Testing Exhaustivo

Tras una primera revisión del proyecto, recibí un feedback crucial: aunque la aplicación funcionaba perfectamente a nivel visual, faltaban evidencias técnicas de la implementación real de la API y validación del código (Testing), además de la visibilidad del repositorio. Dediqué este día exclusivamente a blindar la calidad del software.

Reto 1: Documentación Interactiva y Choque de Puertos
Para demostrar el funcionamiento del backend sin necesidad de software de terceros como Postman, decidí implementar Swagger (`@nestjs/swagger`).

Dificultad técnica: Tras configurarlo en el archivo main.ts, la página de documentación no cargaba. Estaba intentando acceder a la ruta a través del puerto de Angular (`localhost:4200/docs`). Esto me hizo comprender mejor la separación real de entornos en Full-Stack: tuve que dirigir la petición al motor del servidor (`localhost:3000/docs`).

Decisión de Seguridad: Añadí la configuración .addBearerAuth() en Swagger. Sin esto, los endpoints del CRUD protegidos por mi AuthGuard habrían devuelto un error 401 (No Autorizado) al intentar probarlos desde la documentación.

## Reto 2: Validación del Backend (Mocks en NestJS)
Al ejecutar las pruebas unitarias del servidor (npm run test), me encontré con que los tests autogenerados por NestJS fallaban estrepitosamente.

La causa: Los controladores y servicios intentaban conectarse a la base de datos real (MongoDB) y a Cloudinary, algo que el entorno de pruebas no permite.

Solución: Tuve que aprender a falsear o "mockear" estas dependencias. Utilicé getModelToken para inyectar un objeto simulado (mockServicioModel con jest.fn()) que engañara al sistema devolviendo datos falsos. Gracias a esto, logré un 100% de éxito en la suite de pruebas del backend.

## Reto 3: Validación del Frontend (Angular Standalone Testing)
La validación del lado del cliente (ng test) fue el desafío más laborioso. Me enfrenté a errores de compilación masivos como Cannot find module y No provider found for ActivatedRoute.

La causa: Primero, los archivos .spec.ts tenían importaciones mal nombradas (ej. import { Admin } en lugar de AdminComponent). Segundo, como mis componentes son Standalone, no contaban con el entorno necesario para simular rutas o peticiones HTTP.

Solución: Refactoricé los TestBed de los 6 componentes principales. Añadiendo provideHttpClientTesting() evité que el frontend intentara llamar al backend real durante los tests. El último bug fue en la GaleriaComponent, que fallaba al usar directivas de enlace (routerLink); lo solucioné inyectando un simulador de rutas con provideRouter([]). El resultado final fue un pase completo de 7/7 pruebas exitosas.

Finalmente, completé el proyecto creando un archivo README.md profesional con las instrucciones de despliegue y asegurando que el repositorio de GitHub fuera de acceso público para la evaluación técnica. Con esto, considero el proyecto Full-Stack 100% finalizado y auditado.