import { Injectable } from '@nestjs/common';
import { INotificationChannel } from './notifications-channel.interface';

@Injectable()
export class EmailChannel implements INotificationChannel {
  async send(message: string) {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test('test@example.com');
      if (!isValidEmail) {
        return { success: false, log: '[Email]: Invalid email format' };
      }
      const template = 'Hello, this is a test email.';
      console.log('[Email]: Sending email with template:', message);
      // Simulate email sending logic here
      return { success: true, log: 'Email sended succesfully' };
    } catch (error) {
      return { success: false, log: '[Email]: Failed to send email' };
    }
  }
}
