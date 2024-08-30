import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Configurer CORS
  app.enableCors({
    origin: configService.get<string>('LOCAL_WEB_SERVEUR'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = configService.get<number>('PORT', 3000);

  await app.listen(port, '0.0.0.0');
  console.log(
    `Server is running. You can access it at http://localhost:${port}`,
  );
}

bootstrap();
