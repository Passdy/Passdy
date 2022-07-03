
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/models/entities/users.entity'
import { ROLES_KEY } from '../decorators/role.decorator';
import jwtDecode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        const user: {
            username: string;
            sub: number;
            exp: number;
            role: UserRole;
        } = jwtDecode(token);
        return requiredRoles.some((userRole) => user.role?.includes(userRole));
    }
}
