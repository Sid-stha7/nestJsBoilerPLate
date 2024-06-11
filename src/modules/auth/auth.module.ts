import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

//
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

//
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

//
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

//
@Module({
  imports: [
    UserModule,
    PassportModule,
    //
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get<string>('app.jwt_secrete'),
          signOptions: { expiresIn: '7d', algorithm: 'HS256' },
        };
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
