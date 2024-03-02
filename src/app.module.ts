import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  GroupModule,
  ProfileModule,
  SubTaskModule,
  TaskModule,
} from './modules';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationMiddleware } from './middlewares';
import { JwtService } from '@nestjs/jwt';
import {
  GroupController,
  SubTaskController,
  TaskController,
} from './controllers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'facebook' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    GroupModule,
    TaskModule,
    SubTaskModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes(
        { path: '/auth/password/change', method: RequestMethod.PUT },
        { path: '/auth/password/set', method: RequestMethod.PUT },
        { path: '/profile/update-profile', method: RequestMethod.PUT },
        { path: '/profile/me', method: RequestMethod.GET },
        { path: '/profile/:id', method: RequestMethod.GET },
        GroupController,
        TaskController,
        SubTaskController,
      );
  }
}
