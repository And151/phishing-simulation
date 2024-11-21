import {registerAs} from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  userSecret: process.env.JWT_USER_SECRET,
  userExpiresIn: process.env.JWT_USER_TOKEN_EXPIRES_IN,
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
}));
