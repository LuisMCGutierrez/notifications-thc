import { Injectable } from '@nestjs/common';
import { INotificationChannel } from './notifications-channel.interface';

@Injectable()
export class PushChannel implements INotificationChannel {
  async send(message: string) {
    try {
      const deviceToken = 'abc123def456ghi789';
      if (!deviceToken) throw new Error('Device token is required');

      const payload = {
        token: deviceToken,
        notification: {
          title: 'Test Push Notification',
          body: message,
        },
      };

      console.log(
        `[Push]: token: [${deviceToken}] date: [${new Date().toISOString()}] payload: [${JSON.stringify(payload)}]`,
      );
      // Simulate push notification sending logic here
      return { success: true, log: 'Push notification sent successfully' };
    } catch (error) {
      return {
        success: false,
        log: '[Push]: Failed to send push notification',
      };
    }
  }
}
