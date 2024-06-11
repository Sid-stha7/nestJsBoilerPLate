//

import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

//
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';

//
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
//
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      credentials: true,
    },
  });

  const config = app.get(ConfigService);

  // Global prefix
  const globalPrefix = config.get('app.globalPrefix');
  app.setGlobalPrefix(globalPrefix);
  // CORS please
  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new I18nValidationPipe({}));

  // Validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validationError: { target: false },
      // Transforming error to custom object
      exceptionFactory: (errors) => {
        const errorValues = errors.reduce(
          (red, curr) => ({
            ...red,
            [curr.property]: Object.values(curr.constraints),
          }),
          {},
        );

        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid data',
          error: 'Bad request',
          errors: errorValues,
        });
      },
    }),
  );

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );
  // Pino logger
  app.useLogger(app.get(Logger));

  // OpenAPI docs
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Boiler PLate')
    .setDescription('Description')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' },
      'access-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  const customOptions: SwaggerCustomOptions = {
    explorer: false,
    customSiteTitle: 'Boiler PLate',
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('api-docs', app, swaggerDocument, customOptions);
  app.use(cookieParser());
  // Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    }),
  );

  //
  const port = +(config.get('app.port') ?? 3000);

  // Booting up the server
  await app.listen(port, () => {
    console.log('Server run on port: ' + port);
  });
}
bootstrap();
