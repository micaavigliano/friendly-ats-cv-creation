export interface SkillCategory {
  id: string;
  name: string;
  skills: string;
}

export interface LinkItem {
  id: string;
  label: string;
  information: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    website: string;
    github: string;
    location: string;
    phone: string;
    additionalLinks: LinkItem[];
    profileImage?: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  languages: LanguageItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  gpa: string;
  description: string[];
}