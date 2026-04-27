import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersService {
  createUser(createUserDto: CreateUserDto): User {
    return { ...createUserDto, id: 1 } as User;
  }
}
