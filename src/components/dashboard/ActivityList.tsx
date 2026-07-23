import { type ReactNode } from "react";
import { MoreVertical } from "lucide-react";
import Badge from "@/components/ui/Badge";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: "success" | "info" | "warning" | "default";
  icon?: ReactNode;
}

interface ActivityListProps {
  activities: ActivityItem[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start gap-4 rounded-lg border border-gray-100 bg-white p-4 transition-colors hover:border-gray-200"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ background: "#f1f5f9" }}
          >
            {activity.icon || (
              <div className="h-2 w-2 rounded-full bg-orange-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-navy-900 truncate">
                {activity.title}
              </p>
              <button className="shrink-0 text-navy-300 hover:text-navy-500">
                <MoreVertical size={16} />
              </button>
            </div>
            <p className="mt-0.5 text-xs text-navy-400 line-clamp-1">
              {activity.description}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-navy-400">{activity.timestamp}</span>
              <Badge variant={activity.type} size="sm">
                {activity.type === "success" && "Completed"}
                {activity.type === "info" && "Updated"}
                {activity.type === "warning" && "Pending"}
                {activity.type === "default" && "Info"}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
