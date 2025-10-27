import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/users/entity/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const requireRole = this.reflector.get<UserRole>('role', context.getHandler());
        if(!requireRole) return true;

        const{ user } = context.switchToHttp().getRequest();
        return user?.role === requireRole;
    }
}