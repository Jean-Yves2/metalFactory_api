import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.LOCAL_WEB_SERVEUR, // frontend url for development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());
  //app.use(sessionMiddleware);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(morgan('dev'));

  await app.listen(process.env.NODE_ENV || 3000);
}
bootstrap();
