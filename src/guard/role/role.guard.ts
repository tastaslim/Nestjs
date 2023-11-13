import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../interface/role.enum';
import { ApiResponseService } from '../../api-response/api-response.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly apiResponseService: ApiResponseService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    // Get current user role from Access Token
    const { userRoles } = context.switchToHttp().getRequest();
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) return true;
    const hasAccess = requireRoles.some((role) => userRoles.includes(role));
    if (hasAccess) {
      return hasAccess;
    } else {
      throw this.apiResponseService.FORBIDDEN(
        'Insufficient Privileges to the User',
      );
    }
  }
}
