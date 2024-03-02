import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable({})
export class FacebookAuthGuard extends AuthGuard('facebook') {
  async canActivate(context: ExecutionContext) {
    const isActive = (await super.canActivate(context)) as boolean;
    const req = context.switchToHttp().getRequest();
    await super.logIn(req);
    return isActive;
  }
}
