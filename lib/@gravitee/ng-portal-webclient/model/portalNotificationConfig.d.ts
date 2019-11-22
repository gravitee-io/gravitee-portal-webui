import { NotificationConfig } from './notificationConfig';
export interface PortalNotificationConfig extends NotificationConfig {
    /**
     * User id of the creator of the notification config.
     */
    user?: string;
}
