import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('v1');
  app.enableCors();

  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 min
      max: 4 * 60, // limit each IP to 240 requests per windowMs
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('COVID19 Status Argentina')
    .setDescription(
      'API de casos de COVID19 en Argentina a nivel nacional, provincial y departamental. Las fechas deben pasarse en formato Date ISO 8601 (yyyy-mm-dd)',
    )
    .setVersion('1.0')
    .setContact(
      'Federico Montes de Oca',
      'https://github.com/FedeMDO',
      'federicomdo97@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'COVID19 Argentina API',
  });

  await app.listen(process.env.PORT || 80);
}
bootstrap();
