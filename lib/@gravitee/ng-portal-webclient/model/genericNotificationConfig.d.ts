import { NotificationConfig } from './notificationConfig';
export interface GenericNotificationConfig extends NotificationConfig {
    /**
     * Unique identifier of the generic notification config.
     */
    id?: string;
    /**
     * Type of notification system (Email, WebHook, ...).
     */
    notifier?: string;
    /**
     * Configuration of the notifier.
     */
    config?: string;
    /**
     * True if the notifier should use system proxy.
     */
    use_system_proxy?: boolean;
}
