import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule } from 'nestjs-i18n';

//
import Config from './config';
import mailerOptions from './config/mailer';
import typeormConfig from './config/mysql.config';
import pinoLoggerOptions from './config/pino-logger';
import serveStaticOptions from './config/serve-static';

//
import { JwtAuthGuard } from './guards/jwt-auth.guard';

//
import { dataSource } from './database/data-source';


@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: Config,
      cache: true,
    }),
    // https://docs.nestjs.com/recipes/serve-static
    ServeStaticModule.forRoot(serveStaticOptions),
    // https://www.npmjs.com/package/nestjs-pino
    LoggerModule.forRoot(pinoLoggerOptions),
    // https://nest-modules.github.io/mailer/
    MailerModule.forRoot(mailerOptions),
    // TypeORM
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        dataSource.initialize();
        return typeormConfig;
      },
    }),
    // i18n
    I18nModule.forRootAsync({
      inject: [ConfigService],
      resolvers: [AcceptLanguageResolver],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, 'i18n'),
          watch: configService.get('app.app_env') === 'development',
        },
      }),
    }),
    // Business modules
  
  ],
  providers: [
    // Jwt Auth guard, enabled globally
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
