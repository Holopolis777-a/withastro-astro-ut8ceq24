import { useNotificationStore } from '../../../../store/notificationStore';
import { useMessageStore } from '../../../../store/messageStore';

export function useNavNotifications() {
  const { notifications } = useNotificationStore();
  const { messages } = useMessageStore();

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = messages.filter(m => !m.read).length;

  return {
    unreadNotifications,
    unreadMessages,
    hasUnread: unreadNotifications > 0 || unreadMessages > 0,
  };
}