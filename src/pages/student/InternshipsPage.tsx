"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Building2,
  CheckCircle2,
  Clock,
  Briefcase,
  Star,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { subscribeToInternships, addInternship, updateInternship, deleteInternship } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { Internship } from "@/types/profile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function InternshipsPage() {
  const { user } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingInternship, setEditingInternship] = useState<Internship | null>(null);
  const [newInternship, setNewInternship] = useState<Omit<Internship, "id">>({
    company: "",
    role: "",
    duration: "",
    responsibilities: [],
    skillsLearned: [],
    supervisorFeedback: "",
    completionStatus: "Ongoing",
  });

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToInternships(user.uid, (data) => setInternships(data));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleAddInternship = async () => {
    if (!newInternship.company.trim() || !user?.uid) return;
    if (editingInternship) {
      await updateInternship(user.uid, editingInternship.id!, newInternship);
      setEditingInternship(null);
    } else {
      await addInternship(user.uid, newInternship);
    }
    setNewInternship({
      company: "",
      role: "",
      duration: "",
      responsibilities: [],
      skillsLearned: [],
      supervisorFeedback: "",
      completionStatus: "Ongoing",
    });
    setShowAddModal(false);
  };

  const handleEditInternship = (internship: Internship) => {
    setEditingInternship(internship);
    setNewInternship({
      company: internship.company,
      role: internship.role,
      duration: internship.duration,
      responsibilities: internship.responsibilities,
      skillsLearned: internship.skillsLearned,
      supervisorFeedback: internship.supervisorFeedback,
      completionStatus: internship.completionStatus,
    });
    setShowAddModal(true);
  };

  const handleDeleteInternship = async (internshipId: string) => {
    if (!user?.uid) return;
    if (confirm("Are you sure you want to delete this internship?")) {
      await deleteInternship(user.uid, internshipId);
    }
  };

  const ongoingInternships = internships.filter((i) => i.completionStatus === "Ongoing").length;
  const completedInternships = internships.filter((i) => i.completionStatus === "Completed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Internships</h1>
          <p className="text-sm text-navy-400 mt-1">Track your professional experience</p>
        </div>
        <Button size="lg" leftIcon={<Plus size={18} />} onClick={() => { setEditingInternship(null); setNewInternship({ company: "", role: "", duration: "", responsibilities: [], skillsLearned: [], supervisorFeedback: "", completionStatus: "Ongoing" }); setShowAddModal(true); }}>
          Add Internship
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
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef3f0" }}>
              <Building2 size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{internships.length}</p>
              <p className="text-xs text-navy-400">Total Internships</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <Clock size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{ongoingInternships}</p>
              <p className="text-xs text-navy-400">Ongoing</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{completedInternships}</p>
              <p className="text-xs text-navy-400">Completed</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
              <Star size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{internships.length > 0 ? Math.round(internships.reduce((acc, i) => acc + i.skillsLearned.length, 0) / internships.length) : 0}</p>
              <p className="text-xs text-navy-400">Avg Skills Learned</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Internship History</h3>
        <div className="space-y-4">
          {internships.map((internship) => (
            <motion.div
              key={internship.id}
              layout
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: internship.completionStatus === "Completed" ? "#ecfdf5" : "#fef9e7" }}
              >
                <Briefcase size={22} style={{ color: internship.completionStatus === "Completed" ? "#22c55e" : "#f5b942" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-navy-900 truncate">{internship.role}</p>
                  <Badge variant={internship.completionStatus === "Completed" ? "success" : "warning"} size="sm">
                    {internship.completionStatus}
                  </Badge>
                </div>
                <p className="text-xs text-navy-400">{internship.company} • {internship.duration}</p>
                <p className="text-xs text-navy-400 mt-1 line-clamp-2">{internship.supervisorFeedback}</p>
                {internship.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {internship.skillsLearned.map((skill) => (
                      <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleEditInternship(internship)}>
                  <Edit3 size={16} className="text-navy-500" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteInternship(internship.id!)}>
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-900">{editingInternship ? "Edit Internship" : "Add New Internship"}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 size={20} className="text-navy-400" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company" value={newInternship.company} onChange={(e) => setNewInternship({ ...newInternship, company: e.target.value })} placeholder="Google" />
                  <Input label="Role" value={newInternship.role} onChange={(e) => setNewInternship({ ...newInternship, role: e.target.value })} placeholder="Software Engineer Intern" />
                </div>
                <Input label="Duration" value={newInternship.duration} onChange={(e) => setNewInternship({ ...newInternship, duration: e.target.value })} placeholder="Jun 2024 - Aug 2024" />
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Responsibilities (comma separated)</label>
                  <Input value={newInternship.responsibilities.join(", ")} onChange={(e) => setNewInternship({ ...newInternship, responsibilities: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="Developed features, Fixed bugs, Code review" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Skills Learned (comma separated)</label>
                  <Input value={newInternship.skillsLearned.join(", ")} onChange={(e) => setNewInternship({ ...newInternship, skillsLearned: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="React, Node.js, Git" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Supervisor Feedback</label>
                  <textarea
                    value={newInternship.supervisorFeedback}
                    onChange={(e) => setNewInternship({ ...newInternship, supervisorFeedback: e.target.value })}
                    placeholder="Great performance..."
                    className="w-full h-20 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                    style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                  <select
                    value={newInternship.completionStatus}
                    onChange={(e) => setNewInternship({ ...newInternship, completionStatus: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                    style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Offer Extended">Offer Extended</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddInternship}>{editingInternship ? "Update" : "Add"} Internship</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
