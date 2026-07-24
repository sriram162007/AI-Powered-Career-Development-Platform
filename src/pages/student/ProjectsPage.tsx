"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Globe,
  Code2,
  Calendar,
  Star,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { subscribeToProjects, addProject, updateProject, deleteProject } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { Project } from "@/types/profile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    projectName: "",
    description: "",
    technologies: [],
    github: "",
    liveDemo: "",
    skillsUsed: [],
    projectDuration: "",
  });

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToProjects(user.uid, (data) => setProjects(data));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleAddProject = async () => {
    if (!newProject.projectName.trim() || !user?.uid) return;
    if (editingProject) {
      await updateProject(user.uid, editingProject.id!, newProject);
      setEditingProject(null);
    } else {
      await addProject(user.uid, newProject);
    }
    setNewProject({
      projectName: "",
      description: "",
      technologies: [],
      github: "",
      liveDemo: "",
      skillsUsed: [],
      projectDuration: "",
    });
    setShowAddModal(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      projectName: project.projectName,
      description: project.description,
      technologies: project.technologies,
      github: project.github,
      liveDemo: project.liveDemo,
      skillsUsed: project.skillsUsed,
      projectDuration: project.projectDuration,
    });
    setShowAddModal(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!user?.uid) return;
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(user.uid, projectId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Projects</h1>
          <p className="text-sm text-navy-400 mt-1">Showcase your projects and contributions</p>
        </div>
        <Button size="lg" leftIcon={<Plus size={18} />} onClick={() => { setEditingProject(null); setNewProject({ projectName: "", description: "", technologies: [], github: "", liveDemo: "", skillsUsed: [], projectDuration: "" }); setShowAddModal(true); }}>
          Add Project
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
              <Code2 size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{projects.length}</p>
              <p className="text-xs text-navy-400">Total Projects</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <Globe size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{projects.filter((p) => p.liveDemo).length}</p>
              <p className="text-xs text-navy-400">Live Demos</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <Code2 size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{projects.filter((p) => p.github).length}</p>
              <p className="text-xs text-navy-400">Open Source</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
              <Star size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{projects.length > 0 ? Math.round(projects.reduce((acc, p) => acc + p.technologies.length, 0) / projects.length) : 0}</p>
              <p className="text-xs text-navy-400">Avg Tech Stack</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Your Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#f1f5f9" }}
                >
                  <Code2 size={20} style={{ color: "#ff6b35" }} />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditProject(project)}>
                    <Edit3 size={16} className="text-navy-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteProject(project.id!)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-sm font-semibold text-navy-900 mb-1">{project.projectName}</p>
              <p className="text-xs text-navy-400 mb-2 line-clamp-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">{tech}</Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-navy-500 hover:text-navy-700 transition-colors">
                    <Globe size={12} />
                    GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-navy-500 hover:text-navy-700 transition-colors">
                    <ExternalLink size={12} />
                    Live Demo
                  </a>
                )}
                {project.projectDuration && (
                  <span className="flex items-center gap-1 text-xs text-navy-400">
                    <Calendar size={12} />
                    {project.projectDuration}
                  </span>
                )}
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
                <h3 className="text-lg font-semibold text-navy-900">{editingProject ? "Edit Project" : "Add New Project"}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 size={20} className="text-navy-400" />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Project Name" value={newProject.projectName} onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })} placeholder="e.g., E-Commerce Platform" />
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project..."
                    className="w-full h-24 p-3 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all"
                    style={{ background: "var(--surface, #fff)", color: "var(--textPrimary, #0b1020)" }}
                  />
                </div>
                <Input label="Technologies (comma separated)" value={newProject.technologies.join(", ")} onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="React, Node.js, MongoDB" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="GitHub URL" value={newProject.github} onChange={(e) => setNewProject({ ...newProject, github: e.target.value })} placeholder="https://github.com/..." />
                  <Input label="Live Demo URL" value={newProject.liveDemo} onChange={(e) => setNewProject({ ...newProject, liveDemo: e.target.value })} placeholder="https://demo.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Skills Used (comma separated)" value={newProject.skillsUsed.join(", ")} onChange={(e) => setNewProject({ ...newProject, skillsUsed: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="React, TypeScript" />
                  <Input label="Duration" value={newProject.projectDuration} onChange={(e) => setNewProject({ ...newProject, projectDuration: e.target.value })} placeholder="3 months" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddProject}>{editingProject ? "Update" : "Add"} Project</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
