import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from '../../resources/auth/auth.service';
import { ApiResponseService } from '../../api-response/api-response.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly apiResponseService: ApiResponseService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw this.apiResponseService.UNAUTHORIZED('UnAuthorized User');
      }
      const authToken = authorization.replace(/Bearer/gim, '').trim();
      const resp = await this.authService.validateToken(authToken);
      const { roles } = resp;
      request.userRoles = roles;
      return true;
    } catch (error) {
      if (error.status == 401) throw error;
      throw this.apiResponseService.FORBIDDEN(
        error.message || 'User is forbidden',
      );
    }
  }
}
