
export enum UserRole {
  JOB_SEEKER = 'JOB_SEEKER',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  company?: string;
  skills?: string[];
  bio?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Contract';
  salaryRange: string;
  experienceLevel: 'Entry' | 'Intermediate' | 'Senior' | 'Lead';
  description: string;
  postedAt: string;
  status: 'Active' | 'Closed';
  applicantsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'Pending' | 'Shortlisted' | 'Rejected' | 'Interviewing';
  appliedAt: string;
  resumeUrl: string;
  jobTitle: string;
  companyName: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
