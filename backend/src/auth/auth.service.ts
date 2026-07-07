import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, pass: string) {
    // 1. Validar las credenciales contra el .env
    const usuarioValido = 'admin'; // Puedes cambiarlo si quieres otro usuario
    const passwordValido = process.env.ADMIN_PASSWORD;

    if (username !== usuarioValido || pass !== passwordValido) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // 2. Si es correcto, preparamos los datos del token (Payload)
    const payload = { sub: 1, username: username, role: 'admin' };

    // 3. Generamos y devolvemos el token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}