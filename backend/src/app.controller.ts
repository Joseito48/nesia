import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//  Controlador principal de la aplicación, aquí se definen los endpoints generales
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
// Endpoint de prueba para verificar que el backend funciona
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
