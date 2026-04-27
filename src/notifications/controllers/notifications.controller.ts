import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NotificationsService } from '../services/notifications.service';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/users.entity';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { Notification } from '../entities/notification.entity';

export interface RequestWithUser extends Request {
  user: User;
}

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getNotifiications(@Req() req: RequestWithUser) {
    const user = req.user;
    return this.notificationsService.findAllByUser(user.id);
  }

  @Post()
  create(
    @Req() req: RequestWithUser,
    @Body() createNotificationDto: CreateNotificationDto,
  ) {
    const user = req.user;
    return this.notificationsService.create(createNotificationDto, user.id);
  }

  @Patch(':id')
  update(
    @Req() req: RequestWithUser,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Param(':id') id: Notification['id'],
  ) {
    const user = req.user;
    return this.notificationsService.update(user.id, id, updateNotificationDto);
  }

  @Delete(':id')
  delete(@Req() req: RequestWithUser, @Param(':id') id: Notification['id']) {
    const user = req.user;
    return this.notificationsService.delete(user.id, id);
  }
}
