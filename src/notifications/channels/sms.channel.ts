import { Injectable } from '@nestjs/common';
import { INotificationChannel } from './notifications-channel.interface';

@Injectable()
export class SmsChannel implements INotificationChannel {
  async send(message: string) {
    try {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      const phoneNumber = '5512345678';
      const isValidPhone = phoneRegex.test(phoneNumber);
      if (!isValidPhone) {
        return { success: false, log: '[SMS]: Invalid email format' };
      }

      if (message.length > 160) {
        return {
          success: false,
          log: '[SMS]: Message exceeds 160 characters',
        };
      }
      console.log(
        `[SMS]: number: [${phoneNumber}] date: [${new Date().toISOString()}] message: [${message}]`,
      );
      // Simulate SMS sending logic here
      return { success: true, log: 'SMS sent successfully' };
    } catch (error) {
      return { success: false, log: '[SMS]: Failed to send SMS' };
    }
  }
}
