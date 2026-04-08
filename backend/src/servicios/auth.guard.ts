import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Leemos un "pase VIP" de las cabeceras de la petición
    const paseVIP = request.headers['authorization'];

    // Si el pase VIP dice "Bearer true" (que es lo que enviará tu frontend logueado), le dejamos pasar
    if (paseVIP === 'Bearer true') {
      return true;
    }

    // Si no, lo echamos con un Error 401
    throw new UnauthorizedException('Acceso denegado: No eres administrador');
  }
}