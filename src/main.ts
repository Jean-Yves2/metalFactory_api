import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as cookieParser from 'cookie-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.LOCAL_WEB_SERVEUR, // frontend url for development
    methods: 'GET,HEAD,PUT,PATCH,POST',
    credentials: true,
  });

  app.use(cookieParser());
  //app.use(sessionMiddleware);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('dev'));

  await app.listen(3000);
}
bootstrap();
