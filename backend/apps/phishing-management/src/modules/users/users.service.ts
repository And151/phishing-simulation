import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../../../../common/schemas/user.schema';
import {Model} from 'mongoose';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
  }

  async findOneBy(email: string): Promise<User | undefined> {
    return await this.userModel.findOne({email}).exec();
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      email: createUserDto.email,
      password: hashedPassword,
      username: createUserDto.username,
      createdAt: createUserDto.createdAt,
    });
    await newUser.save();
    return {
      success: true,
      message: 'User created!',
    };
  }
}
