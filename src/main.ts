import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  //Swagger

  const config = new DocumentBuilder()
    .setTitle('Métal Factory API')
    .setDescription(
      'Metal Factory est une plateforme de vente en ligne spécialisée dans la fourniture de métaux de haute qualité. Notre API permet de gérer les produits métalliques, les commandes et les utilisateurs, facilitant ainsi une intégration fluide avec nos systèmes internes et externes.',
    )
    .setVersion('1.1.0')
    .addBearerAuth()
    .addTag('Products', 'Endpoints pour la gestion des produits métalliques')
    .addTag('Orders', 'Endpoints pour la gestion des commandes')
    .addTag('Users', 'Endpoints pour la gestion des utilisateurs')
    .addTag(
      'Auth',
      "Endpoints pour l'authentification et la gestion des jetons",
    )
    .addTag('Favorites', 'Endpoints pour la gestion des favoris')
    .addTag('Commercial', 'Endpoints pour les utilisateurs commerciaux')
    .addTag('Supplier Orders', 'Endpoints pour les commandes fournisseur')
    .addTag('Payments', 'Endpoints pour la gestion des paiements')
    .addTag('Quotes', 'Endpoints pour la gestion des devis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log('You Win! Server is running on port:', port);
  });
}
bootstrap();
