import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
