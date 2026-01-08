
import React from 'react';
import { Job, User, UserRole } from './types';

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA (Remote)',
    type: 'Remote',
    salaryRange: '$140k - $180k',
    experienceLevel: 'Senior',
    description: 'We are looking for a React expert to lead our dashboard revamp...',
    postedAt: '2024-05-20',
    status: 'Active',
    applicantsCount: 12
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'CreativePulse',
    location: 'New York, NY',
    type: 'Full-time',
    salaryRange: '$110k - $150k',
    experienceLevel: 'Intermediate',
    description: 'Join our design team to build intuitive user experiences...',
    postedAt: '2024-05-18',
    status: 'Active',
    applicantsCount: 8
  },
  {
    id: '3',
    title: 'DevOps Architect',
    company: 'CloudScale Inc.',
    location: 'Austin, TX',
    type: 'Full-time',
    salaryRange: '$160k - $210k',
    experienceLevel: 'Lead',
    description: 'Lead our migration to a fully serverless architecture...',
    postedAt: '2024-05-15',
    status: 'Active',
    applicantsCount: 5
  }
];

export const MOCK_USER_SEEKER: User = {
  id: 'u1',
  name: 'Ahmed Raza',
  email: 'ahmed.raza@example.com',
  role: UserRole.JOB_SEEKER,
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ahmed&backgroundColor=b6e3f4',
  skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
  bio: 'Experienced full-stack developer passionate about building scalable web applications and AI-driven solutions.'
};

export const MOCK_USER_EMPLOYER: User = {
  id: 'e1',
  name: 'M.Hassan Umrani',
  email: 'm.hassanumrani@techflow.com',
  role: UserRole.EMPLOYER,
  company: 'TechFlow Systems',
  avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechFlow'
};
