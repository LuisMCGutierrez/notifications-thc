import { Body, Controller, Inject, Injectable, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject()
    private readonly usersService: UsersService,
  ) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
