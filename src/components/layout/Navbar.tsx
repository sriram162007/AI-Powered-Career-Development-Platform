import { useMemo } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user } = useAuth();

  const displayName = useMemo(() => {
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      const atIndex = user.email.indexOf("@");
      if (atIndex > 0) return user.email.substring(0, atIndex);
    }
    return "Student";
  }, [user?.displayName, user?.email]);

  const initials = useMemo(() => {
    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [displayName]);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-navy-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="lg:hidden p-2 text-navy-400 hover:text-navy-600 transition-colors">
          <Menu size={20} />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" size={18} />
          <input
            type="text"
            placeholder="Search careers, skills, or jobs..."
            className="w-full pl-10 pr-4 py-2 bg-navy-50 border border-navy-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all placeholder:text-navy-300"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-navy-400 hover:text-navy-600 hover:bg-navy-50 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>
        <button className="flex items-center gap-2 pl-2 pr-1 sm:pr-2 py-1 rounded-lg hover:bg-navy-50 transition-colors">
          <div className="w-8 h-8 bg-navy-100 rounded-full flex items-center justify-center text-navy-700 font-semibold text-xs ring-1 ring-navy-200">
            {initials || "S"}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-navy-700 leading-none">{displayName}</p>
            <p className="text-xs text-navy-400 mt-0.5">Free Plan</p>
          </div>
        </button>
      </div>
    </header>
  );
}
