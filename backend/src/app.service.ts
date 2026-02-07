import { Injectable } from '@nestjs/common';
// Servicio principal de la aplicación, aquí se definen los métodos generales que pueden ser utilizados en toda la aplicación
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
