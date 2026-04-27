import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { NotificationChannels } from '../entities/notification.entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content!: string;

  @IsNotEmpty()
  @IsEnum(NotificationChannels)
  channel!: NotificationChannels;
}
