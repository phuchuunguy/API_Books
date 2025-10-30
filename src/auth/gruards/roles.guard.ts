import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly allowedRoles: string[]) {}
  
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !user.role)
        throw new ForbiddenException('No role found in token');
  
      if (!this.allowedRoles.includes(user.role))
        throw new ForbiddenException('Access denied');
  
      return true;
    }
  }
  