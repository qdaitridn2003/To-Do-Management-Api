import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Fs from 'fs';
import * as ExpressSession from 'express-session';
import * as Passport from 'passport';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: Fs.readFileSync('./secrets/cert.key'),
      cert: Fs.readFileSync('./secrets/cert.crt'),
    },
  });
  // const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({}));
  app.enableCors();

  app.use(
    ExpressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(Passport.initialize());
  app.use(Passport.session());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo Management API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/doc', app, swaggerDocument);

  await app.listen(process.env.PORT);
}
bootstrap();
