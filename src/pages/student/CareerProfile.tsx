"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  BookOpen,
  Target,
  Save,
  Plus,
  Trash2,
  Award,
  Users,
  Trophy,
  Medal,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { getOrCreateProfile, saveProfile, subscribeToProfile } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { useResume } from "@/contexts/ResumeContext";
import { useToast } from "@/contexts/ToastContext";import type {
  PersonalInfo,
  AcademicInfo,
  CareerGoal,
  Language,
  Achievement,
  VolunteerExperience,
  Hackathon,
  Award as AwardType,
  Publication,
} from "@/types/profile";

type Tab = "personal" | "academic" | "career" | "languages" | "achievements" | "volunteer" | "hackathons" | "awards" | "publications";

const emptyPersonal: PersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  linkedin: "",
  github: "",
  portfolio: "",
  location: "",
};

const emptyAcademic: AcademicInfo = {
  university: "",
  degree: "",
  department: "",
  currentYear: "",
  cgpa: "",
  graduationYear: "",
};

const emptyCareerGoal: CareerGoal = {
  targetRole: "",
  preferredIndustry: "",
  preferredLocation: "",
};

const emptyLanguage: Omit<Language, "id"> = {
  name: "",
  proficiency: "",
};

const emptyAchievement: Omit<Achievement, "id"> = {
  title: "",
  description: "",
  date: "",
  issuer: "",
};

const emptyVolunteer: Omit<VolunteerExperience, "id"> = {
  organization: "",
  role: "",
  duration: "",
  description: "",
};

const emptyHackathon: Omit<Hackathon, "id"> = {
  name: "",
  date: "",
  location: "",
  position: "",
  project: "",
};

const emptyAward: Omit<AwardType, "id"> = {
  title: "",
  issuer: "",
  date: "",
  description: "",
};

const emptyPublication: Omit<Publication, "id"> = {
  title: "",
  publisher: "",
  date: "",
  link: "",
  description: "",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function CareerProfile() {
  const { user } = useAuth();
  const { setResumeData } = useResume();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [saving, setSaving] = useState(false);

  const [personal, setPersonal] = useState<PersonalInfo>({ ...emptyPersonal });
  const [academic, setAcademic] = useState<AcademicInfo>({ ...emptyAcademic });
  const [careerGoal, setCareerGoal] = useState<CareerGoal>({ ...emptyCareerGoal });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerExperience[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [awards, setAwards] = useState<AwardType[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    const unsubscribe = subscribeToProfile(user.uid, (data) => {
      if (data) {
        setPersonal(data.personalInfo || { ...emptyPersonal });
        setAcademic(data.academicInfo || { ...emptyAcademic });
        setCareerGoal(data.careerGoal || { ...emptyCareerGoal });
        setLanguages(data.languages || []);
        setAchievements(data.achievements || []);
        setVolunteers(data.volunteerExperience || []);
        setHackathons(data.hackathons || []);
        setAwards(data.awards || []);
        setPublications(data.publications || []);
        setResumeData({
          careerObjective: "",
          contact: data.personalInfo || { ...emptyPersonal },
          education: data.academicInfo || { ...emptyAcademic },
          skills: data.skills || [],
          projects: data.projects || [],
          experience: data.internships || [],
          internships: data.internships || [],
          certificates: data.certificates || [],
          achievements: data.achievements || [],
          languages: data.languages || [],
          template: "modern",
          lastUpdated: new Date().toISOString().split("T")[0],
        });
      } else {
        getOrCreateProfile(user.uid, user?.email ?? undefined).then((p) => {
          setPersonal(p.personalInfo || { ...emptyPersonal });
          setAcademic(p.academicInfo || { ...emptyAcademic });
          setCareerGoal(p.careerGoal || { ...emptyCareerGoal });
          setLanguages(p.languages || []);
          setAchievements(p.achievements || []);
          setVolunteers(p.volunteerExperience || []);
          setHackathons(p.hackathons || []);
          setAwards(p.awards || []);
          setPublications(p.publications || []);
        });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid, user?.email, setResumeData]);

  const handleSave = async () => {
    if (!user?.uid) return;
    setSaving(true);

    const updates: any = {
      personalInfo: personal,
      academicInfo: academic,
      careerGoal: careerGoal,
      languages,
      achievements,
      volunteerExperience: volunteers,
      hackathons,
      awards,
      publications,
      updatedAt: new Date().toISOString(),
    };

    try {
      await saveProfile(user.uid, updates);
      addToast("Profile saved successfully!", "success");
    } catch {
      addToast("Failed to save profile. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "personal", label: "Personal", icon: <User size={18} /> },
    { key: "academic", label: "Academic", icon: <BookOpen size={18} /> },
    { key: "career", label: "Career Goal", icon: <Target size={18} /> },
    { key: "languages", label: "Languages", icon: <Globe size={18} /> },
    { key: "achievements", label: "Achievements", icon: <Award size={18} /> },
    { key: "volunteer", label: "Volunteer", icon: <Users size={18} /> },
    { key: "hackathons", label: "Hackathons", icon: <Trophy size={18} /> },
    { key: "awards", label: "Awards", icon: <Medal size={18} /> },
    { key: "publications", label: "Publications", icon: <FileText size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Career Profile</h1>
          <p className="text-sm text-navy-400 mt-1">Complete your profile to unlock personalized career insights</p>
        </div>
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Save size={18} />}
          onClick={handleSave}
          loading={saving}
        >
          Save Profile
        </Button>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#fef3f0" }}
            >
              <User size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {[
                  personal.fullName,
                  academic.university,
                  careerGoal.targetRole,
                  ...languages.map((l) => l.name),
                  ...achievements.map((a) => a.title),
                  ...volunteers.map((v) => v.organization),
                  ...hackathons.map((h) => h.name),
                  ...awards.map((a) => a.title),
                  ...publications.map((p) => p.title),
                ].filter(Boolean).length}
              </p>
              <p className="text-xs text-navy-400">Fields Completed</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#ecfdf5" }}
            >
              <Sparkles size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {Math.round(
                  ([
                    personal.fullName, personal.email, personal.phone, personal.linkedin,
                    academic.university, academic.degree, academic.cgpa,
                    careerGoal.targetRole,
                    ...languages.map((l) => l.name),
                    ...achievements.map((a) => a.title),
                    ...volunteers.map((v) => v.organization),
                    ...hackathons.map((h) => h.name),
                    ...awards.map((a) => a.title),
                    ...publications.map((p) => p.title),
                  ].filter(Boolean).length /
                    Math.max(1, 16)) * 100
                )}
              </p>
              <p className="text-xs text-navy-400">Profile Completeness</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#fef9e7" }}
            >
              <Award size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{achievements.length + awards.length}</p>
              <p className="text-xs text-navy-400">Achievements & Awards</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center"
              style={{ background: "#eff6ff" }}
            >
              <BookOpen size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{publications.length + hackathons.length}</p>
              <p className="text-xs text-navy-400">Publications & Hackathons</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

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
          {activeTab === "personal" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Full Name" value={personal.fullName} onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })} leftIcon={<User size={16} />} placeholder="John Doe" />
                  <Input label="Email" type="email" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} leftIcon={<Mail size={16} />} placeholder="john@example.com" />
                  <Input label="Phone" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} leftIcon={<Phone size={16} />} placeholder="+91 98765 43210" />
                  <Input label="Location" value={personal.location} onChange={(e) => setPersonal({ ...personal, location: e.target.value })} leftIcon={<MapPin size={16} />} placeholder="Bangalore, India" />
                  <Input label="LinkedIn" value={personal.linkedin} onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })} leftIcon={<Link2 size={16} />} placeholder="https://linkedin.com/in/john" />
                  <Input label="GitHub" value={personal.github} onChange={(e) => setPersonal({ ...personal, github: e.target.value })} leftIcon={<Link2 size={16} />} placeholder="https://github.com/john" />
                  <Input label="Portfolio" value={personal.portfolio} onChange={(e) => setPersonal({ ...personal, portfolio: e.target.value })} leftIcon={<Globe size={16} />} placeholder="https://johndoe.dev" className="sm:col-span-2" />
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "academic" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="University" value={academic.university} onChange={(e) => setAcademic({ ...academic, university: e.target.value })} placeholder="IIT Bombay" className="sm:col-span-2" />
                  <Input label="Degree" value={academic.degree} onChange={(e) => setAcademic({ ...academic, degree: e.target.value })} placeholder="B.Tech" />
                  <Input label="Department" value={academic.department} onChange={(e) => setAcademic({ ...academic, department: e.target.value })} placeholder="Computer Science" />
                  <Input label="Current Year" value={academic.currentYear} onChange={(e) => setAcademic({ ...academic, currentYear: e.target.value })} placeholder="3rd Year" />
                  <Input label="CGPA" value={academic.cgpa} onChange={(e) => setAcademic({ ...academic, cgpa: e.target.value })} placeholder="8.5" />
                  <Input label="Graduation Year" value={academic.graduationYear} onChange={(e) => setAcademic({ ...academic, graduationYear: e.target.value })} placeholder="2026" />
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "career" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <h3 className="text-base font-semibold text-navy-900 mb-4">Career Goal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Target Role" value={careerGoal.targetRole} onChange={(e) => setCareerGoal({ ...careerGoal, targetRole: e.target.value })} placeholder="Software Engineer" className="sm:col-span-2" />
                  <Input label="Preferred Industry" value={careerGoal.preferredIndustry} onChange={(e) => setCareerGoal({ ...careerGoal, preferredIndustry: e.target.value })} placeholder="Technology" />
                  <Input label="Preferred Location" value={careerGoal.preferredLocation} onChange={(e) => setCareerGoal({ ...careerGoal, preferredLocation: e.target.value })} placeholder="Bangalore" />
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "languages" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Languages</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setLanguages([...languages, { ...emptyLanguage }])}>Add Language</Button>
                </div>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-white">
                      <Input value={lang.name} onChange={(e) => {
                        const updated = [...languages];
                        updated[index] = { ...lang, name: e.target.value };
                        setLanguages(updated);
                      }} placeholder="Language" className="flex-1" />
                      <Input value={lang.proficiency} onChange={(e) => {
                        const updated = [...languages];
                        updated[index] = { ...lang, proficiency: e.target.value };
                        setLanguages(updated);
                      }} placeholder="Proficiency" className="w-40" />
                      <Button variant="ghost" size="sm" onClick={() => setLanguages(languages.filter((_, i) => i !== index))}>
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Achievements</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setAchievements([...achievements, { ...emptyAchievement }])}>Add Achievement</Button>
                </div>
                <div className="space-y-3">
                  {achievements.map((ach, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input value={ach.title} onChange={(e) => {
                          const updated = [...achievements];
                          updated[index] = { ...ach, title: e.target.value };
                          setAchievements(updated);
                        }} placeholder="Title" />
                        <Input value={ach.issuer} onChange={(e) => {
                          const updated = [...achievements];
                          updated[index] = { ...ach, issuer: e.target.value };
                          setAchievements(updated);
                        }} placeholder="Issuer" />
                        <Input value={ach.date} onChange={(e) => {
                          const updated = [...achievements];
                          updated[index] = { ...ach, date: e.target.value };
                          setAchievements(updated);
                        }} placeholder="Date" className="sm:col-span-2" />
                        <textarea
                          value={ach.description}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[index] = { ...ach, description: e.target.value };
                            setAchievements(updated);
                          }}
                          placeholder="Description"
                          className="w-full h-20 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                          style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setAchievements(achievements.filter((_, i) => i !== index))}>
                          <Trash2 size={14} className="mr-1 text-red-500" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "volunteer" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Volunteer Experience</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setVolunteers([...volunteers, { ...emptyVolunteer }])}>Add Volunteer</Button>
                </div>
                <div className="space-y-3">
                  {volunteers.map((vol, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input value={vol.organization} onChange={(e) => {
                          const updated = [...volunteers];
                          updated[index] = { ...vol, organization: e.target.value };
                          setVolunteers(updated);
                        }} placeholder="Organization" />
                        <Input value={vol.role} onChange={(e) => {
                          const updated = [...volunteers];
                          updated[index] = { ...vol, role: e.target.value };
                          setVolunteers(updated);
                        }} placeholder="Role" />
                        <Input value={vol.duration} onChange={(e) => {
                          const updated = [...volunteers];
                          updated[index] = { ...vol, duration: e.target.value };
                          setVolunteers(updated);
                        }} placeholder="Duration" className="sm:col-span-2" />
                        <textarea
                          value={vol.description}
                          onChange={(e) => {
                            const updated = [...volunteers];
                            updated[index] = { ...vol, description: e.target.value };
                            setVolunteers(updated);
                          }}
                          placeholder="Description"
                          className="w-full h-20 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                          style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setVolunteers(volunteers.filter((_, i) => i !== index))}>
                          <Trash2 size={14} className="mr-1 text-red-500" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "hackathons" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Hackathons</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setHackathons([...hackathons, { ...emptyHackathon }])}>Add Hackathon</Button>
                </div>
                <div className="space-y-3">
                  {hackathons.map((hack, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input value={hack.name} onChange={(e) => {
                          const updated = [...hackathons];
                          updated[index] = { ...hack, name: e.target.value };
                          setHackathons(updated);
                        }} placeholder="Hackathon Name" className="sm:col-span-2" />
                        <Input value={hack.date} onChange={(e) => {
                          const updated = [...hackathons];
                          updated[index] = { ...hack, date: e.target.value };
                          setHackathons(updated);
                        }} placeholder="Date" />
                        <Input value={hack.location} onChange={(e) => {
                          const updated = [...hackathons];
                          updated[index] = { ...hack, location: e.target.value };
                          setHackathons(updated);
                        }} placeholder="Location" />
                        <Input value={hack.position} onChange={(e) => {
                          const updated = [...hackathons];
                          updated[index] = { ...hack, position: e.target.value };
                          setHackathons(updated);
                        }} placeholder="Position" />
                        <Input value={hack.project} onChange={(e) => {
                          const updated = [...hackathons];
                          updated[index] = { ...hack, project: e.target.value };
                          setHackathons(updated);
                        }} placeholder="Project" />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setHackathons(hackathons.filter((_, i) => i !== index))}>
                          <Trash2 size={14} className="mr-1 text-red-500" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "awards" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Awards</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setAwards([...awards, { ...emptyAward }])}>Add Award</Button>
                </div>
                <div className="space-y-3">
                  {awards.map((award, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input value={award.title} onChange={(e) => {
                          const updated = [...awards];
                          updated[index] = { ...award, title: e.target.value };
                          setAwards(updated);
                        }} placeholder="Award Title" className="sm:col-span-2" />
                        <Input value={award.issuer} onChange={(e) => {
                          const updated = [...awards];
                          updated[index] = { ...award, issuer: e.target.value };
                          setAwards(updated);
                        }} placeholder="Issuer" />
                        <Input value={award.date} onChange={(e) => {
                          const updated = [...awards];
                          updated[index] = { ...award, date: e.target.value };
                          setAwards(updated);
                        }} placeholder="Date" />
                        <textarea
                          value={award.description}
                          onChange={(e) => {
                            const updated = [...awards];
                            updated[index] = { ...award, description: e.target.value };
                            setAwards(updated);
                          }}
                          placeholder="Description"
                          className="w-full h-20 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                          style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setAwards(awards.filter((_, i) => i !== index))}>
                          <Trash2 size={14} className="mr-1 text-red-500" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "publications" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-navy-900">Publications</h3>
                  <Button size="sm" leftIcon={<Plus size={16} />} onClick={() => setPublications([...publications, { ...emptyPublication }])}>Add Publication</Button>
                </div>
                <div className="space-y-3">
                  {publications.map((pub, index) => (
                    <div key={index} className="p-4 rounded-xl border border-gray-100 bg-white space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input value={pub.title} onChange={(e) => {
                          const updated = [...publications];
                          updated[index] = { ...pub, title: e.target.value };
                          setPublications(updated);
                        }} placeholder="Title" className="sm:col-span-2" />
                        <Input value={pub.publisher} onChange={(e) => {
                          const updated = [...publications];
                          updated[index] = { ...pub, publisher: e.target.value };
                          setPublications(updated);
                        }} placeholder="Publisher" />
                        <Input value={pub.date} onChange={(e) => {
                          const updated = [...publications];
                          updated[index] = { ...pub, date: e.target.value };
                          setPublications(updated);
                        }} placeholder="Date" />
                        <Input value={pub.link} onChange={(e) => {
                          const updated = [...publications];
                          updated[index] = { ...pub, link: e.target.value };
                          setPublications(updated);
                        }} placeholder="Link" className="sm:col-span-2" />
                        <textarea
                          value={pub.description}
                          onChange={(e) => {
                            const updated = [...publications];
                            updated[index] = { ...pub, description: e.target.value };
                            setPublications(updated);
                          }}
                          placeholder="Description"
                          className="w-full h-20 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                          style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="ghost" size="sm" onClick={() => setPublications(publications.filter((_, i) => i !== index))}>
                          <Trash2 size={14} className="mr-1 text-red-500" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
