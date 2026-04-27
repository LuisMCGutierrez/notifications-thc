import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { NotificationChannels } from '../entities/notification.entity';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  content?: string;
}
