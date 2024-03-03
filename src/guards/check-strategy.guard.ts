import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MetaDataKey } from '../commons';
import { JwtPayload } from '../types';

@Injectable({})
export class CheckStrategyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const strategies = this.reflector.get<string[]>(
      MetaDataKey.Strategy,
      context.getHandler(),
    );

    if (!strategies) return true;

    const req = context.switchToHttp().getRequest();
    const { strategy } = req['auth'] as JwtPayload;
    if (strategies.includes(strategy)) return true;

    return false;
  }
}
