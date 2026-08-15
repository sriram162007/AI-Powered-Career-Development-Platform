import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  Sparkles,
  FileText,
  User,
  Code2,
  Briefcase,
  Award,
  PenTool,
  LineChart,
  CheckCircle2,
  Target,
  Tag,
} from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { ALL_PLANS } from '@/config/pricing';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/career-discovery', icon: BookOpen, label: 'Career Discovery' },
  { to: '/skill-gap', icon: Target, label: 'Skill Gap' },
  { to: '/career-path', icon: BookOpen, label: 'Career Path' },
  { to: '/dashboard/resume-analysis', icon: FileText, label: 'Resume Analysis' },
  { to: '/profile', icon: User, label: 'Career Profile' },
  { to: '/skills-management', icon: Code2, label: 'Skills Management' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/certificates', icon: Award, label: 'Certificates' },
  { to: '/projects', icon: Briefcase, label: 'Projects' },
  { to: '/internships', icon: Briefcase, label: 'Internships' },
  { to: '/resume-builder', icon: PenTool, label: 'AI Resume Builder' },
  { to: '/career-readiness', icon: LineChart, label: 'Career Readiness' },
  { to: '/profile-completeness', icon: CheckCircle2, label: 'Profile Completeness' },
  { to: '/pricing', icon: Tag, label: 'Pricing' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const { plan } = useSubscription();
  const navigate = useNavigate();
  const planInfo = ALL_PLANS[plan] || ALL_PLANS["free"];

  const handlePlanClick = () => {
    navigate("/pricing");
  };

  const avatarColor =
    plan === "free"
      ? "bg-navy-700 text-navy-200"
      : plan === "starter"
      ? "bg-orange-500/20 text-orange-400"
      : plan === "pro"
      ? "bg-navy-500/20 text-navy-200"
      : plan === "institution_starter"
      ? "bg-blue-500/20 text-blue-400"
      : plan === "institution_pro"
      ? "bg-purple-500/20 text-purple-400"
      : "bg-gold-500/20 text-gold-400";

  const avatarText =
    plan === "free" ? "AI" : plan.charAt(0).toUpperCase();

  return (
    <aside className="h-screen w-64 bg-navy-900 text-white flex flex-col border-r border-navy-700/50 fixed inset-y-0 left-0 z-30">
      <div className="h-16 flex items-center px-6 border-b border-navy-700/50">
        <Sparkles className="w-5 h-5 text-orange-500 mr-2" />
        <span className="text-xl font-bold tracking-tight text-white">Career<span className="text-orange-500">Path</span></span>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-navy-800 text-orange-400'
                  : 'text-navy-200 hover:bg-navy-800/60 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div
        className="p-4 border-t border-navy-700/50 cursor-pointer hover:bg-navy-800/30 transition-colors"
        onClick={handlePlanClick}
      >
        <div className="flex items-center gap-3 px-3 py-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${avatarColor}`}>
            {avatarText}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {planInfo.name} Plan
            </p>
            <p className="text-xs text-navy-300 truncate">
              {plan === "free" || plan === "enterprise"
                ? "Upgrade"
                : "Manage Plan"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
