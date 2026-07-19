import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  // Inyectamos el servicio JWT para poder descifrar tokens
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // 1. Extraemos el token de la cabecera "Authorization: Bearer <token>"
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Acceso denegado: No hay token');
    }

    try {
      // 2. Verificamos matemáticamente que el token es nuestro y no ha caducado
      // Usamos el secreto directamente desde el entorno
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, 
      });
      
      // 3. (Opcional) Guardamos los datos del usuario en la request por si el controlador los necesita
      request['user'] = payload;
    } catch {
      // Si el token es falso, ha sido modificado, o ha caducado
      throw new UnauthorizedException('Acceso denegado: Token inválido o caducado');
    }

    // 4. Si todo va bien, dejamos pasar la petición
    return true;
  }

  // Función auxiliar para limpiar la cabecera y quedarse solo con el token
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}