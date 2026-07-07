import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: Record<string, any>) {
    // Recibimos el body desde Angular y se lo pasamos al servicio
    return this.authService.login(body.username, body.password);
  }
}