"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Camera,
  Lock,
  Moon,
  Sun,
  Monitor,
  AlertTriangle,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";

type Tab = "profile" | "notifications" | "appearance" | "privacy";

const preferences = {
  emailNotifications: true,
  pushNotifications: true,
  weeklyReports: true,
  interviewReminders: true,
  jobAlerts: true,
  achievementBadges: false,
  marketingEmails: false,
};

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [prefs, setPrefs] = useState(preferences);

  const displayName = useMemo(() => {
    if (user?.displayName) return user.displayName;
    if (user?.email) {
      const atIndex = user.email.indexOf("@");
      if (atIndex > 0) return user.email.substring(0, atIndex);
    }
    return "Student";
  }, [user?.displayName, user?.email]);

  const userInitials = useMemo(() => {
    return displayName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "S";
  }, [displayName]);

  const togglePref = (key: keyof typeof preferences) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "profile", label: "Profile", icon: <User size={18} /> },
    { key: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { key: "appearance", label: "Appearance", icon: <Palette size={18} /> },
    { key: "privacy", label: "Privacy", icon: <Shield size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Settings</h1>
        <p className="text-sm text-navy-400 mt-1">Manage your account preferences and profile</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 shrink-0">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-white text-navy-600 hover:bg-gray-50 border border-gray-100"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Profile Information</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-navy-100 flex items-center justify-center text-navy-700 font-bold text-xl">
                      {userInitials}
                    </div>
                    <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">Profile Photo</p>
                    <p className="text-xs text-navy-400">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="John Doe" leftIcon={<User size={16} />} />
                  <Input label="Email" type="email" placeholder="john@example.com" leftIcon={<Mail size={16} />} />
                  <Input label="Phone" placeholder="+91 98765 43210" leftIcon={<Phone size={16} />} />
                  <Input label="Location" placeholder="Bangalore, India" leftIcon={<MapPin size={16} />} />
                </div>
                <div className="flex justify-end mt-6">
                  <Button variant="primary" leftIcon={<Save size={16} />}>Save Changes</Button>
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Professional Summary</h3>
                <textarea
                  placeholder="Tell us about your career goals, experience, and aspirations..."
                  className="w-full h-32 p-4 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                  style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                />
                <div className="flex justify-end mt-4">
                  <Button variant="primary" leftIcon={<Save size={16} />}>Update Summary</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-1">Notification Preferences</h3>
                <p className="text-xs text-navy-400 mb-4">Choose what notifications you want to receive</p>
                <div className="space-y-4">
                  {Object.entries(prefs).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div>
                        <p className="text-sm font-medium text-navy-900">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </p>
                        <p className="text-xs text-navy-400 mt-0.5">
                          {key === "emailNotifications" && "Receive updates via email"}
                          {key === "pushNotifications" && "Browser push notifications"}
                          {key === "weeklyReports" && "Weekly progress summary"}
                          {key === "interviewReminders" && "Reminders before interviews"}
                          {key === "jobAlerts" && "New job matching notifications"}
                          {key === "achievementBadges" && "Notify when badges are earned"}
                          {key === "marketingEmails" && "Product updates and promotions"}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePref(key as keyof typeof preferences)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                          value ? "bg-orange-500" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            value ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "appearance" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-1">Theme</h3>
                <p className="text-xs text-navy-400 mb-4">Customize your visual preferences</p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { key: "light", label: "Light", icon: <Sun size={20} /> },
                    { key: "dark", label: "Dark", icon: <Moon size={20} /> },
                    { key: "system", label: "System", icon: <Monitor size={20} /> },
                  ].map((theme) => (
                    <motion.button
                      key={theme.key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-4 rounded-xl border-2 border-orange-400 bg-orange-50 text-center transition-all"
                    >
                      <div className="mx-auto mb-2 h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {theme.icon}
                      </div>
                      <p className="text-sm font-medium text-navy-900">{theme.label}</p>
                    </motion.button>
                  ))}
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-1">Language & Region</h3>
                <p className="text-xs text-navy-400 mb-4">Set your preferred language and timezone</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Language" placeholder="English (US)" leftIcon={<Globe size={16} />} />
                  <Input label="Timezone" placeholder="IST (UTC +5:30)" />
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary" leftIcon={<Save size={16} />}>Save Preferences</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "privacy" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-1">Security</h3>
                <p className="text-xs text-navy-400 mb-4">Manage your password and security settings</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-navy-600">
                        <Lock size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">Password</p>
                        <p className="text-xs text-navy-400">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowPasswordModal(true)}>
                      Change Password
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center text-navy-600">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900">Two-Factor Authentication</p>
                        <p className="text-xs text-navy-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">Disabled</Badge>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-1">Data & Privacy</h3>
                <p className="text-xs text-navy-400 mb-4">Control your data sharing preferences</p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-navy-900">Profile Visibility</p>
                      <p className="text-xs text-navy-400">Allow recruiters to view your profile</p>
                    </div>
                    <button
                      onClick={() => togglePref("emailNotifications")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                        prefs.emailNotifications ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          prefs.emailNotifications ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-navy-900">Share Analytics</p>
                      <p className="text-xs text-navy-400">Help improve CareerAI with usage data</p>
                    </div>
                    <button
                      onClick={() => togglePref("pushNotifications")}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                        prefs.pushNotifications ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          prefs.pushNotifications ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Card>

              <Card padding="lg" className="border-red-100">
                <h3 className="text-base font-semibold text-red-600 mb-1">Danger Zone</h3>
                <p className="text-xs text-navy-400 mb-4">Irreversible actions that affect your account</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-navy-900">Delete Account</p>
                    <p className="text-xs text-navy-400">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
                    Delete Account
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        description="Update your password to keep your account secure."
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
            <Button variant="primary" leftIcon={<Lock size={16} />}>Update Password</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Current Password" type="password" placeholder="Enter current password" />
          <Input label="New Password" type="password" placeholder="Enter new password" />
          <Input label="Confirm Password" type="password" placeholder="Confirm new password" />
        </div>
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        description="This action cannot be undone. All your data will be permanently removed."
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger">Yes, Delete My Account</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-700">Warning</p>
              <p className="text-xs text-red-600 mt-1">
                Deleting your account will remove all your progress, skills, interview history, and analytics data. This cannot be reversed.
              </p>
            </div>
          </div>
          <Input label="Confirm by typing DELETE" placeholder="Type DELETE to confirm" />
        </div>
      </Modal>
    </div>
  );
}
