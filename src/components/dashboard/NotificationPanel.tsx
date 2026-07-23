import { Bell, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: "info" | "success" | "warning";
}

interface NotificationPanelProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
  onViewAll?: () => void;
}

export function NotificationPanel({
  notifications,
  onDismiss,
  onViewAll,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="rounded-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-navy-500" />
          <h3 className="text-sm font-semibold text-navy-900">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="danger" size="sm">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {onViewAll && (
          <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
            View All
          </Button>
        )}
      </div>

      <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-5 py-3 transition-colors ${
              !notification.read ? "bg-orange-50/30" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-navy-900 truncate">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-navy-400 line-clamp-2">
                  {notification.message}
                </p>
                <span className="mt-1.5 inline-block text-xs text-navy-400">
                  {notification.time}
                </span>
              </div>
              {onDismiss && (
                <button
                  onClick={() => onDismiss(notification.id)}
                  className="shrink-0 text-navy-300 hover:text-navy-500 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
