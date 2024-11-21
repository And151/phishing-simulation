import {User} from '../../../../common/schemas/user.schema';

export class BaseUserDto {
  username?: string;
  email: string;

  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
  }
}

export class UserDto extends BaseUserDto {
  password: string;

  constructor(user: User) {
    super(user);
    this.password = user.password;
  }
}
