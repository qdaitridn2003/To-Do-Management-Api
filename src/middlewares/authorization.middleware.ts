import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response } from 'express';
import { JwtPayload } from '../types';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(@Inject(JwtService) private readonly jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'] as string;
    if (!authorization) {
      throw new HttpException(
        'Not available authorization',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const token = authorization.includes('Bearer')
      ? authorization.split(' ')[1]
      : authorization;

    try {
      const { id, profileId, role, strategy } = (await this.jwtService.verify(
        token,
        {
          secret: process.env.JWT_SECRET,
          algorithms: ['HS256'],
        },
      )) as JwtPayload;

      req['auth'] = { id, profileId, role, strategy };

      return next();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
