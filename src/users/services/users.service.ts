import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(id: User['id']): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findByEmailWithPassowrd(email: string): Promise<User | null> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }
}
