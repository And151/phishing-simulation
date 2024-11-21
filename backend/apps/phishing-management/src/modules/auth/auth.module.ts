import {Module} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {JwtModule} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from '../../../../common/schemas/user.schema';
import {JwtStrategy} from './jwt-strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: (process.env.JWT_USER_SECRET as string) || '2i4ugbi3ugbibug43',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {
}
