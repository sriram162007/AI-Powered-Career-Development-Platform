"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  Trash2,
  Edit3,
  ExternalLink,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { subscribeToCourses, addCourse, updateCourse, deleteCourse, addSkill } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { Course } from "@/types/profile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    courseName: "",
    provider: "",
    duration: "",
    completionDate: "",
    certificate: "",
    skillsLearned: [],
    status: "In Progress",
  });

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToCourses(user.uid, (data) => setCourses(data));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleAddCourse = async () => {
    if (!newCourse.courseName.trim() || !user?.uid) return;
    if (editingCourse) {
      await updateCourse(user.uid, editingCourse.id!, newCourse);
      setEditingCourse(null);
    } else {
      const course = await addCourse(user.uid, newCourse);
      if (course && newCourse.status === "Completed") {
        for (const skill of newCourse.skillsLearned) {
          await addSkill(user.uid, {
            name: skill,
            category: "technical",
            level: "Intermediate",
            lastUpdated: new Date().toISOString().split("T")[0],
            source: "Course",
          });
        }
      }
    }
    setNewCourse({
      courseName: "",
      provider: "",
      duration: "",
      completionDate: "",
      certificate: "",
      skillsLearned: [],
      status: "In Progress",
    });
    setShowAddModal(false);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      courseName: course.courseName,
      provider: course.provider,
      duration: course.duration,
      completionDate: course.completionDate,
      certificate: course.certificate,
      skillsLearned: course.skillsLearned,
      status: course.status,
    });
    setShowAddModal(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!user?.uid) return;
    if (confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(user.uid, courseId);
    }
  };

  const completedCourses = courses.filter((c) => c.status === "Completed").length;
  const inProgressCourses = courses.filter((c) => c.status === "In Progress").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Courses & Learning</h1>
          <p className="text-sm text-navy-400 mt-1">Track your courses and certifications</p>
        </div>
        <Button size="lg" leftIcon={<Plus size={18} />} onClick={() => { setEditingCourse(null); setNewCourse({ courseName: "", provider: "", duration: "", completionDate: "", certificate: "", skillsLearned: [], status: "In Progress" }); setShowAddModal(true); }}>
          Add Course
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
              <BookOpen size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{courses.length}</p>
              <p className="text-xs text-navy-400">Total Courses</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{completedCourses}</p>
              <p className="text-xs text-navy-400">Completed</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <Clock size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{inProgressCourses}</p>
              <p className="text-xs text-navy-400">In Progress</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
              <Award size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {courses.length > 0 ? Math.round((completedCourses / courses.length) * 100) : 0}%
              </p>
              <p className="text-xs text-navy-400">Completion Rate</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Learning History</h3>
        <div className="space-y-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              layout
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-gray-200 transition-colors"
            >
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: course.status === "Completed" ? "#ecfdf5" : "#fef9e7" }}
              >
                {course.status === "Completed" ? (
                  <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
                ) : (
                  <Clock size={22} style={{ color: "#f5b942" }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-navy-900 truncate">{course.courseName}</p>
                  <Badge variant={course.status === "Completed" ? "success" : "warning"} size="sm">
                    {course.status}
                  </Badge>
                </div>
                <p className="text-xs text-navy-400">{course.provider} • {course.duration}</p>
                <p className="text-xs text-navy-400 mt-1">Completed: {course.completionDate || "In Progress"}</p>
                {course.skillsLearned.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.skillsLearned.map((skill) => (
                      <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                    ))}
                  </div>
                )}
                {course.certificate && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-navy-500">
                    <ExternalLink size={12} />
                    <a href={course.certificate} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">View Certificate</a>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                  <Edit3 size={16} className="text-navy-500" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course.id!)}>
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
              className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-900">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 size={20} className="text-navy-400" />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Course Name" value={newCourse.courseName} onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })} placeholder="e.g., React Advanced" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Provider" value={newCourse.provider} onChange={(e) => setNewCourse({ ...newCourse, provider: e.target.value })} placeholder="Coursera" />
                  <Input label="Duration" value={newCourse.duration} onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })} placeholder="6 weeks" />
                  <Input label="Completion Date" type="date" value={newCourse.completionDate} onChange={(e) => setNewCourse({ ...newCourse, completionDate: e.target.value })} />
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                  <select
                    value={newCourse.status}
                    onChange={(e) => setNewCourse({ ...newCourse, status: e.target.value as any })}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                      style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Dropped">Dropped</option>
                    </select>
                  </div>
                </div>
                <Input label="Certificate URL" value={newCourse.certificate} onChange={(e) => setNewCourse({ ...newCourse, certificate: e.target.value })} placeholder="https://certificate-link.com" />
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Skills Learned (comma separated)</label>
                  <Input value={newCourse.skillsLearned.join(", ")} onChange={(e) => setNewCourse({ ...newCourse, skillsLearned: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="React, TypeScript, Redux" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddCourse}>{editingCourse ? "Update" : "Add"} Course</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
