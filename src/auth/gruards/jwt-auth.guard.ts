import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
    
        if (!authHeader || !authHeader.startsWith('Bearer '))
          throw new UnauthorizedException('Missing token');
    
        const token = authHeader.split(' ')[1];
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET || 'My_SecretKey_OOO');
          request.user = decoded; 
          return true;
        } catch {
          throw new UnauthorizedException('Invalid token');
        }
      }
}

