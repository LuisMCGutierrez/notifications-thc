import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { RegisterDto } from '../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const exists = await this.usersService.findByEmail(registerDto.email);
    if (exists) throw new ConflictException();
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = {
      ...registerDto,
      password: hashedPassword,
    };

    const { password, ...result } = await this.usersService.create(user);
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmailWithPassowrd(
      loginDto.email,
    );
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(loginDto.password, user.password);
    if (!valid) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
