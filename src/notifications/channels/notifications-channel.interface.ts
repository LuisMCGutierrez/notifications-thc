export interface NotificatrionResult {
  success: boolean;
  log: string;
}

export interface INotificationChannel {
  send(message: string): Promise<NotificatrionResult>;
}
