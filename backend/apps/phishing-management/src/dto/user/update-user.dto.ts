import {CreateUserDto} from './create-user.dto';

class UpdateUserDto extends CreateUserDto {
  updatedAt: Date;
}
