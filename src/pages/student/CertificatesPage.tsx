"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Award,
  ExternalLink,
  Trash2,
  Edit3,
  CheckCircle2,
  Link2,
  Calendar,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { subscribeToCertificates, addCertificate, updateCertificate, deleteCertificate } from "@/lib/firestore";
import { useAuth } from "@/contexts/AuthContext";
import type { Certificate } from "@/types/profile";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 },
};

export default function CertificatesPage() {
  const { user } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);
  const [newCert, setNewCert] = useState<Omit<Certificate, "id">>({
    certificateName: "",
    provider: "",
    issueDate: "",
    credentialId: "",
    verificationLink: "",
    relatedSkills: [],
  });

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToCertificates(user.uid, (data) => setCertificates(data));
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user?.uid]);

  const handleAddCert = async () => {
    if (!newCert.certificateName.trim() || !user?.uid) return;
    if (editingCert) {
      await updateCertificate(user.uid, editingCert.id!, newCert);
      setEditingCert(null);
    } else {
      await addCertificate(user.uid, newCert);
    }
    setNewCert({
      certificateName: "",
      provider: "",
      issueDate: "",
      credentialId: "",
      verificationLink: "",
      relatedSkills: [],
    });
    setShowAddModal(false);
  };

  const handleEditCert = (cert: Certificate) => {
    setEditingCert(cert);
    setNewCert({
      certificateName: cert.certificateName,
      provider: cert.provider,
      issueDate: cert.issueDate,
      credentialId: cert.credentialId,
      verificationLink: cert.verificationLink,
      relatedSkills: cert.relatedSkills,
    });
    setShowAddModal(true);
  };

  const handleDeleteCert = async (certId: string) => {
    if (!user?.uid) return;
    if (confirm("Are you sure you want to delete this certificate?")) {
      await deleteCertificate(user.uid, certId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Certificates</h1>
          <p className="text-sm text-navy-400 mt-1">Manage your certifications and credentials</p>
        </div>
        <Button size="lg" leftIcon={<Plus size={18} />} onClick={() => { setEditingCert(null); setNewCert({ certificateName: "", provider: "", issueDate: "", credentialId: "", verificationLink: "", relatedSkills: [] }); setShowAddModal(true); }}>
          Add Certificate
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
              <Award size={22} style={{ color: "#ff6b35" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{certificates.length}</p>
              <p className="text-xs text-navy-400">Total Certificates</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#ecfdf5" }}>
              <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">{certificates.length}</p>
              <p className="text-xs text-navy-400">Verified</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#fef9e7" }}>
              <Calendar size={22} style={{ color: "#f5b942" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {certificates.length > 0 ? certificates[certificates.length - 1]?.issueDate || "N/A" : "N/A"}
              </p>
              <p className="text-xs text-navy-400">Latest Certificate</p>
            </div>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card padding="md" className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: "#eff6ff" }}>
              <Link2 size={22} style={{ color: "#3b82f6" }} />
            </div>
            <div>
              <p className="text-2xl font-bold text-navy-900">
                {certificates.filter((c) => c.verificationLink).length}
              </p>
              <p className="text-xs text-navy-400">With Verification</p>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      <Card padding="md">
        <h3 className="text-base font-semibold text-navy-900 mb-4">Your Certificates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              layout
              className="p-5 rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#fef3f0" }}
                >
                  <Award size={20} style={{ color: "#ff6b35" }} />
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleEditCert(cert)}>
                    <Edit3 size={16} className="text-navy-500" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteCert(cert.id!)}>
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </div>
              </div>
              <p className="text-sm font-semibold text-navy-900 mb-1">{cert.certificateName}</p>
              <p className="text-xs text-navy-400 mb-2">{cert.provider}</p>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" size="sm">{cert.issueDate}</Badge>
                <Badge variant="outline" size="sm">ID: {cert.credentialId}</Badge>
              </div>
              {cert.relatedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {cert.relatedSkills.map((skill) => (
                    <Badge key={skill} variant="outline" size="sm">{skill}</Badge>
                  ))}
                </div>
              )}
              {cert.verificationLink && (
                <a
                  href={cert.verificationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <ExternalLink size={12} />
                  Verify Certificate
                </a>
              )}
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
                <h3 className="text-lg font-semibold text-navy-900">{editingCert ? "Edit Certificate" : "Add New Certificate"}</h3>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <Trash2 size={20} className="text-navy-400" />
                </button>
              </div>
              <div className="space-y-4">
                <Input label="Certificate Name" value={newCert.certificateName} onChange={(e) => setNewCert({ ...newCert, certificateName: e.target.value })} placeholder="e.g., AWS Solutions Architect" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Provider" value={newCert.provider} onChange={(e) => setNewCert({ ...newCert, provider: e.target.value })} placeholder="AWS" />
                  <Input label="Issue Date" type="date" value={newCert.issueDate} onChange={(e) => setNewCert({ ...newCert, issueDate: e.target.value })} />
                </div>
                <Input label="Credential ID" value={newCert.credentialId} onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })} placeholder="ABC123XYZ" />
                <Input label="Verification Link" value={newCert.verificationLink} onChange={(e) => setNewCert({ ...newCert, verificationLink: e.target.value })} placeholder="https://verify.example.com/ABC123" />
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Related Skills (comma separated)</label>
                  <Input value={newCert.relatedSkills.join(", ")} onChange={(e) => setNewCert({ ...newCert, relatedSkills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} placeholder="AWS, Cloud, DevOps" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddCert}>{editingCert ? "Update" : "Add"} Certificate</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
