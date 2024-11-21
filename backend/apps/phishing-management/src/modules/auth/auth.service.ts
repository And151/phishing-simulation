import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import * as bcrypt from 'bcryptjs';
import {BaseUserDto} from '../../dto/user/user.dto';
import {User} from 'apps/common/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async signIn(email, password) {
    const user = await this.usersService.findOneBy(email);
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const payload = {id: user.id, email: user.email};

    const data = new BaseUserDto(user);
    return {
      success: true,
      access_token: await this.jwtService.signAsync(payload),
      data: new BaseUserDto(user),
    };
  }

  async signUp(payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }
}
