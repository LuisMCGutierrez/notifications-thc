import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import {
  Notification,
  NotificationChannels,
} from '../entities/notification.entity';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { UsersService } from 'src/users/services/users.service';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailChannel } from '../channels/email.channel';
import { SmsChannel } from '../channels/sms.channel';
import { PushChannel } from '../channels/push.channel';
import { INotificationChannel } from '../channels/notifications-channel.interface';
@Injectable()
export class NotificationsService {
  private readonly channels: Record<NotificationChannels, INotificationChannel>;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly userService: UsersService,

    private readonly emailChannel: EmailChannel,
    private readonly smsChannel: SmsChannel,
    private readonly pushChannel: PushChannel,
  ) {
    this.channels = {
      [NotificationChannels.EMAIL]: this.emailChannel,
      [NotificationChannels.SMS]: this.smsChannel,
      [NotificationChannels.PUSH]: this.pushChannel,
    };
  }

  async findAllByUser(userId: User['id']): Promise<Notification[]> {
    return await this.notificationsRepository.findBy({ userId });
  }

  private async findOne(
    userId: User['id'],
    notificationId: Notification['id'],
  ): Promise<Notification> {
    const notification = await this.notificationsRepository.findOne({
      where: {
        userId,
        id: notificationId,
      },
    });
    if (!notification) throw new NotFoundException();

    return notification;
  }

  async create(
    createNotificationDto: CreateNotificationDto,
    userId: User['id'],
  ): Promise<Notification> {
    const notification = this.notificationsRepository.create({
      ...createNotificationDto,
      userId,
    });

    this.sendNotification(notification).catch((error) => {
      console.error('Failed to send notification:', error);
    });
    return await this.notificationsRepository.save(notification);
  }

  async update(
    userId: User['id'],
    notificationId: Notification['id'],
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.findOne(userId, notificationId);
    const updNotification = Object.assign(notification, updateNotificationDto);
    return await this.notificationsRepository.save(updNotification);
  }

  async delete(
    userId: User['id'],
    notificationId: Notification['id'],
  ): Promise<void> {
    const notification = await this.findOne(userId, notificationId);
    await this.notificationsRepository.delete(notification);
  }

  async sendNotification(notification: Notification) {
    const channel = this.channels[notification.channel];
    if (!channel) {
      throw new Error(`Channel not found for type: ${notification.channel}`);
    }
    await channel.send(notification.content);
  }
}
