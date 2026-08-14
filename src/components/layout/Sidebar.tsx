import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  MessageSquare,
  BarChart3,
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
  Upload,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/career-path', icon: BookOpen, label: 'Career Path' },
  { to: '/skills', icon: GraduationCap, label: 'Skills' },
  { to: '/interviews', icon: MessageSquare, label: 'Mock Interviews' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/dashboard/resume-analysis', icon: FileText, label: 'Resume Analysis' },
  { to: '/resume-upload', icon: Upload, label: 'Resume Upload' },
  { to: '/profile', icon: User, label: 'Career Profile' },
  { to: '/skills-management', icon: Code2, label: 'Skills Management' },
  { to: '/courses', icon: BookOpen, label: 'Courses' },
  { to: '/certificates', icon: Award, label: 'Certificates' },
  { to: '/projects', icon: Briefcase, label: 'Projects' },
  { to: '/internships', icon: Briefcase, label: 'Internships' },
  { to: '/resume-builder', icon: PenTool, label: 'AI Resume Builder' },
  { to: '/career-readiness', icon: LineChart, label: 'Career Readiness' },
  { to: '/profile-completeness', icon: CheckCircle2, label: 'Profile Completeness' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-navy-900 text-white flex flex-col border-r border-navy-700/50 fixed inset-y-0 left-0 z-30">
      <div className="h-16 flex items-center px-6 border-b border-navy-700/50">
        <Sparkles className="w-5 h-5 text-orange-500 mr-2" />
        <span className="text-xl font-bold tracking-tight text-white">CareerAI</span>
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
      <div className="p-4 border-t border-navy-700/50">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center text-navy-200 text-xs font-semibold">
            AI
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Free Plan</p>
            <p className="text-xs text-navy-300 truncate">Upgrade for more</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
