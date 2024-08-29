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
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log('You Win! Server is running on port:', port);
  });
}
bootstrap();
