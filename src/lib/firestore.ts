import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage } from "./firebaseClient";
import { normalizeSkillName, isSkillNameMatch } from "./skillNormalization";
import type {
  UserProfile,
  Skill,
  SkillLevel,
  Course,
  Certificate,
  Project,
  Internship,
  ResumeData,
  CareerAnalytics,
} from "@/types/profile";

function getDb() {
  return getFirebaseDb();
}

function getStorage() {
  return getFirebaseStorage();
}

const COLLECTIONS = {
  profiles: "profiles",
  skills: "skills",
  courses: "courses",
  certificates: "certificates",
  projects: "projects",
  internships: "internships",
  resumes: "resumes",
  analytics: "careerAnalytics",
  mockInterviews: "mockInterviews",
  placement: "placement",
} as const;

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function now() {
  return new Date().toISOString();
}

function createPlaceholderProfile(uid: string, email?: string): UserProfile {
  return {
    id: uid,
    uid,
    personalInfo: {
      fullName: "",
      email: email || uid,
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
      location: "",
    },
    academicInfo: {
      university: "",
      degree: "",
      department: "",
      currentYear: "",
      cgpa: "",
      graduationYear: "",
    },
    careerGoal: {
      targetRole: "",
      preferredIndustry: "",
      preferredLocation: "",
    },
    skills: [],
    courses: [],
    certificates: [],
    projects: [],
    internships: [],
    languages: [],
    achievements: [],
    volunteerExperience: [],
    hackathons: [],
    awards: [],
    publications: [],
    resume: {
      careerObjective: "",
      education: {
        university: "",
        degree: "",
        department: "",
        currentYear: "",
        cgpa: "",
        graduationYear: "",
      },
      skills: [],
      projects: [],
      experience: [],
      internships: [],
      certificates: [],
      achievements: [],
      languages: [],
      contact: {
        fullName: "",
        email: email || uid,
        phone: "",
        linkedin: "",
        github: "",
        portfolio: "",
        location: "",
      },
      template: "modern",
      lastUpdated: new Date().toISOString().split("T")[0],
    },
     analytics: {
      resumeScore: 0,
      atsScore: 0,
      skillScore: 0,
      cgpaScore: 0,
      projectScore: 0,
      internshipScore: 0,
      certificateScore: 0,
      interviewScore: 0,
      placementReadiness: 0,
      jobReadiness: 0,
      profileCompleteness: 0,
    },
    careerPreferences: {
      selectedCareerId: null,
      interests: [],
      careerDiscoveryCompleted: false,
    },
  };
}

export async function getOrCreateProfile(uid: string, email?: string): Promise<UserProfile> {
  try {
    const db = getDb();
    const profileRef = doc(db, COLLECTIONS.profiles, uid);
    const snapshot = await getDoc(profileRef);

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as UserProfile;
    }

    const placeholder = createPlaceholderProfile(uid, email);
    await setDoc(profileRef, {
      ...placeholder,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { ...placeholder, id: uid };
  } catch (error) {
    console.warn("Firestore unavailable, returning placeholder profile:", error);
    return createPlaceholderProfile(uid, email);
  }
}

export async function saveProfile(uid: string, profile: Partial<UserProfile>): Promise<UserProfile> {
  try {
    const db = getDb();
    const profileRef = doc(db, COLLECTIONS.profiles, uid);
    const payload = {
      ...profile,
      updatedAt: serverTimestamp(),
    };

    await setDoc(profileRef, payload, { merge: true });

    const snapshot = await getDoc(profileRef);
    return { id: snapshot.id, ...snapshot.data() } as UserProfile;
  } catch (error) {
    console.warn("Failed to save profile:", error);
    return profile as UserProfile;
  }
}

export async function saveCareerPreferences(
  uid: string,
  preferences: {
    selectedCareerId?: string | null;
    interests?: string[];
    careerDiscoveryCompleted?: boolean;
  }
): Promise<void> {
  const db = getDb();
  const profileRef = doc(db, COLLECTIONS.profiles, uid);
  const updates: Record<string, unknown> = {
    updatedAt: serverTimestamp(),
  };

  if (preferences.selectedCareerId !== undefined) {
    updates["careerPreferences.selectedCareerId"] = preferences.selectedCareerId;
  }
  if (preferences.interests !== undefined) {
    updates["careerPreferences.interests"] = preferences.interests;
  }
  if (preferences.careerDiscoveryCompleted !== undefined) {
    updates["careerPreferences.careerDiscoveryCompleted"] = preferences.careerDiscoveryCompleted;
  }

  await updateDoc(profileRef, updates);
}

export function subscribeToProfile(uid: string, callback: (profile: UserProfile | null) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const profileRef = doc(db, COLLECTIONS.profiles, uid);

    return onSnapshot(
      profileRef,
      (snapshot) => {
        if (snapshot.exists()) {
          callback({ id: snapshot.id, ...snapshot.data() } as UserProfile);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.warn("Profile subscription error:", error);
        callback(null);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for profile subscription:", error);
    callback(null);
    return null;
  }
}

export async function getProfileAnalytics(uid: string): Promise<CareerAnalytics | null> {
  try {
    const db = getDb();
    const analyticsRef = doc(db, COLLECTIONS.analytics, uid);
    const snapshot = await getDoc(analyticsRef);

    if (snapshot.exists()) {
      return snapshot.data() as CareerAnalytics;
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch analytics:", error);
    return null;
  }
}

export async function saveAnalytics(uid: string, analytics: Partial<CareerAnalytics>): Promise<void> {
  try {
    const db = getDb();
    const analyticsRef = doc(db, COLLECTIONS.analytics, uid);
    await setDoc(analyticsRef, { ...analytics, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.warn("Failed to save analytics:", error);
  }
}

export async function addSkill(uid: string, skill: Omit<Skill, "id">): Promise<Skill | null> {
  try {
    const db = getDb();
    const skillData = { ...skill, id: generateId(), uid, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, COLLECTIONS.skills), skillData);
    return { ...skillData, id: docRef.id } as Skill;
  } catch (error) {
    console.warn("Failed to add skill:", error);
    return null;
  }
}

export interface ResumeSkillInput {
  name: string;
  level: string;
  category: string;
}

export interface MergeResumeSkillsResult {
  added: Skill[];
  skipped: Skill[];
  message: string;
}

export async function mergeResumeSkills(
  uid: string,
  detectedSkills: ResumeSkillInput[]
): Promise<MergeResumeSkillsResult> {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.skills), where("uid", "==", uid));
    const snapshot = await getDocs(q);
    const existingSkills = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Skill);

    const added: Skill[] = [];
    const skipped: Skill[] = [];

    for (const detected of detectedSkills) {
      const normalizedName = normalizeSkillName(detected.name);
      const exists = existingSkills.some((s) => {
        if (isSkillNameMatch(s.name, detected.name)) return true;
        return normalizeSkillName(s.name).toLowerCase() === normalizedName.toLowerCase();
      });

      if (exists) {
        const existing = existingSkills.find((s) => isSkillNameMatch(s.name, detected.name));
        if (existing) skipped.push(existing);
        continue;
      }

      const newSkill: Omit<Skill, "id"> = {
        name: normalizedName || detected.name,
        category: detected.category || "Technical",
        level: "Beginner" as SkillLevel,
        lastUpdated: new Date().toISOString().split("T")[0],
        source: "Self Learning",
      };

      const skillData = { ...newSkill, id: generateId(), uid, createdAt: serverTimestamp() };
      const docRef = await addDoc(collection(db, COLLECTIONS.skills), skillData);
      const addedSkill = { ...skillData, id: docRef.id } as Skill;
      added.push(addedSkill);
      existingSkills.push(addedSkill);
    }

    return {
      added,
      skipped,
      message: `Added ${added.length} new skill(s) from your resume. ${skipped.length} existing skill(s) were preserved.`,
    };
  } catch (error) {
    console.warn("Failed to merge resume skills:", error);
    throw error;
  }
}

export async function updateSkill(_uid: string, skillId: string, updates: Partial<Skill>): Promise<void> {
  try {
    const db = getDb();
    const skillRef = doc(db, COLLECTIONS.skills, skillId);
    await updateDoc(skillRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.warn("Failed to update skill:", error);
  }
}

export async function deleteSkill(_uid: string, skillId: string): Promise<void> {
  try {
    const db = getDb();
    const skillRef = doc(db, COLLECTIONS.skills, skillId);
    await deleteDoc(skillRef);
  } catch (error) {
    console.warn("Failed to delete skill:", error);
  }
}

export function subscribeToSkills(uid: string, callback: (skills: Skill[] | null) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.skills), where("uid", "==", uid), orderBy("lastUpdated", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const skills = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Skill));
        callback(skills);
      },
      (error) => {
        console.warn("Skills subscription error:", error);
        callback(null);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for skills subscription:", error);
    callback(null);
    return null;
  }
}

export async function addCourse(uid: string, course: Omit<Course, "id">): Promise<Course | null> {
  try {
    const db = getDb();
    const courseData = { ...course, id: generateId(), uid, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, COLLECTIONS.courses), courseData);
    return { ...courseData, id: docRef.id } as Course;
  } catch (error) {
    console.warn("Failed to add course:", error);
    return null;
  }
}

export async function updateCourse(_uid: string, courseId: string, updates: Partial<Course>): Promise<void> {
  try {
    const db = getDb();
    const courseRef = doc(db, COLLECTIONS.courses, courseId);
    await updateDoc(courseRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.warn("Failed to update course:", error);
  }
}

export async function deleteCourse(_uid: string, courseId: string): Promise<void> {
  try {
    const db = getDb();
    const courseRef = doc(db, COLLECTIONS.courses, courseId);
    await deleteDoc(courseRef);
  } catch (error) {
    console.warn("Failed to delete course:", error);
  }
}

export function subscribeToCourses(uid: string, callback: (courses: Course[]) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.courses), where("uid", "==", uid), orderBy("completionDate", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const courses = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Course));
        callback(courses);
      },
      (error) => {
        console.warn("Courses subscription error:", error);
        callback([]);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for courses subscription:", error);
    return null;
  }
}

export async function addCertificate(uid: string, certificate: Omit<Certificate, "id">): Promise<Certificate | null> {
  try {
    const db = getDb();
    const certData = { ...certificate, id: generateId(), uid, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, COLLECTIONS.certificates), certData);
    return { ...certData, id: docRef.id } as Certificate;
  } catch (error) {
    console.warn("Failed to add certificate:", error);
    return null;
  }
}

export async function updateCertificate(_uid: string, certificateId: string, updates: Partial<Certificate>): Promise<void> {
  try {
    const db = getDb();
    const certRef = doc(db, COLLECTIONS.certificates, certificateId);
    await updateDoc(certRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.warn("Failed to update certificate:", error);
  }
}

export async function deleteCertificate(_uid: string, certificateId: string): Promise<void> {
  try {
    const db = getDb();
    const certRef = doc(db, COLLECTIONS.certificates, certificateId);
    await deleteDoc(certRef);
  } catch (error) {
    console.warn("Failed to delete certificate:", error);
  }
}

export function subscribeToCertificates(uid: string, callback: (certs: Certificate[]) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.certificates), where("uid", "==", uid), orderBy("issueDate", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const certs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Certificate));
        callback(certs);
      },
      (error) => {
        console.warn("Certificates subscription error:", error);
        callback([]);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for certificates subscription:", error);
    return null;
  }
}

export async function addProject(uid: string, project: Omit<Project, "id">): Promise<Project | null> {
  try {
    const db = getDb();
    const projectData = { ...project, id: generateId(), uid, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, COLLECTIONS.projects), projectData);
    return { ...projectData, id: docRef.id } as Project;
  } catch (error) {
    console.warn("Failed to add project:", error);
    return null;
  }
}

export async function updateProject(_uid: string, projectId: string, updates: Partial<Project>): Promise<void> {
  try {
    const db = getDb();
    const projectRef = doc(db, COLLECTIONS.projects, projectId);
    await updateDoc(projectRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.warn("Failed to update project:", error);
  }
}

export async function deleteProject(_uid: string, projectId: string): Promise<void> {
  try {
    const db = getDb();
    const projectRef = doc(db, COLLECTIONS.projects, projectId);
    await deleteDoc(projectRef);
  } catch (error) {
    console.warn("Failed to delete project:", error);
  }
}

export function subscribeToProjects(uid: string, callback: (projects: Project[]) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.projects), where("uid", "==", uid), orderBy("createdAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Project));
        callback(projects);
      },
      (error) => {
        console.warn("Projects subscription error:", error);
        callback([]);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for projects subscription:", error);
    return null;
  }
}

export async function addInternship(uid: string, internship: Omit<Internship, "id">): Promise<Internship | null> {
  try {
    const db = getDb();
    const internshipData = { ...internship, id: generateId(), uid, createdAt: serverTimestamp() };
    const docRef = await addDoc(collection(db, COLLECTIONS.internships), internshipData);
    return { ...internshipData, id: docRef.id } as Internship;
  } catch (error) {
    console.warn("Failed to add internship:", error);
    return null;
  }
}

export async function updateInternship(_uid: string, internshipId: string, updates: Partial<Internship>): Promise<void> {
  try {
    const db = getDb();
    const internshipRef = doc(db, COLLECTIONS.internships, internshipId);
    await updateDoc(internshipRef, { ...updates, updatedAt: serverTimestamp() });
  } catch (error) {
    console.warn("Failed to update internship:", error);
  }
}

export async function deleteInternship(_uid: string, internshipId: string): Promise<void> {
  try {
    const db = getDb();
    const internshipRef = doc(db, COLLECTIONS.internships, internshipId);
    await deleteDoc(internshipRef);
  } catch (error) {
    console.warn("Failed to delete internship:", error);
  }
}

export function subscribeToInternships(uid: string, callback: (internships: Internship[]) => void): Unsubscribe | null {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.internships), where("uid", "==", uid), orderBy("createdAt", "desc"));

    return onSnapshot(
      q,
      (snapshot) => {
        const internships = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Internship));
        callback(internships);
      },
      (error) => {
        console.warn("Internships subscription error:", error);
        callback([]);
      }
    );
  } catch (error) {
    console.warn("Firestore unavailable for internships subscription:", error);
    return null;
  }
}

export async function getResume(uid: string): Promise<ResumeData | null> {
  try {
    const db = getDb();
    const resumeRef = doc(db, COLLECTIONS.resumes, uid);
    const snapshot = await getDoc(resumeRef);

    if (snapshot.exists()) {
      return snapshot.data() as ResumeData;
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch resume:", error);
    return null;
  }
}

export async function saveResume(uid: string, resume: Partial<ResumeData>): Promise<ResumeData | null> {
  try {
    const db = getDb();
    const resumeRef = doc(db, COLLECTIONS.resumes, uid);
    const payload = {
      ...resume,
      lastUpdated: now(),
    };

    await setDoc(resumeRef, payload, { merge: true });

    const snapshot = await getDoc(resumeRef);
    return { id: snapshot.id, ...snapshot.data() } as ResumeData;
  } catch (error) {
    console.warn("Failed to save resume:", error);
    return resume as ResumeData | null;
  }
}

export async function uploadCertificateFile(uid: string, _file: File): Promise<string | null> {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `certificates/${uid}/${generateId()}_${_file.name}`);
    await uploadBytes(fileRef, _file);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.warn("Failed to upload file:", error);
    return null;
  }
}

export async function getPlacementData(uid: string): Promise<any | null> {
  try {
    const db = getDb();
    const placementRef = doc(db, COLLECTIONS.placement, uid);
    const snapshot = await getDoc(placementRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (error) {
    console.warn("Failed to fetch placement data:", error);
    return null;
  }
}

export async function savePlacementData(uid: string, data: any): Promise<void> {
  try {
    const db = getDb();
    const placementRef = doc(db, COLLECTIONS.placement, uid);
    await setDoc(placementRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
  } catch (error) {
    console.warn("Failed to save placement data:", error);
  }
}

export async function getMockInterviews(uid: string): Promise<any[]> {
  try {
    const db = getDb();
    const q = query(collection(db, COLLECTIONS.mockInterviews), where("uid", "==", uid), orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Failed to fetch mock interviews:", error);
    return [];
  }
}
