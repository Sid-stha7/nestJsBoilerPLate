import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => {
  return {
    app_env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT),
    globalPrefix: process.env.PREFIX ?? 'api',
    web_url: process.env.WEB_URL,
    jwt_secret: process.env.JWT_SECRET_KEY,
    manufacture_admin: `${process.env.MANUFACTURE_ADMIN}`,
    manufacture_admin_id: Number(process.env.MANUFACTURE_ADMIN_ID),
  };
});
