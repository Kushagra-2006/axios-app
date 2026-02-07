// Core Types for AxiosLab

export type StartupStage = 'Pre-Seed' | 'Seed' | 'Series A';
export type TaskCategory = 'Marketing' | 'Hiring' | 'Product' | 'Fundraising';
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type CandidateStage = 'Applied' | 'Shortlisted' | 'Interview' | 'Hired';
export type InvestorStatus = 'contacted' | 'meeting' | 'closed';
export type SocialPlatform = 'LinkedIn' | 'Twitter/X' | 'Instagram';
export type ContentType = 'post' | 'thread' | 'caption';

export interface User {
    id: string;
    email: string;
    name: string;
    startupId?: string;
}

export interface Startup {
    id: string;
    name: string;
    stage: StartupStage;
    teamSize: number;
    primaryGoal: string;
    createdAt: Date;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    category: TaskCategory;
    status: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt: Date;
}

export interface SocialContent {
    id: string;
    platform: SocialPlatform;
    contentType: ContentType;
    topic?: string;
    content: string;
    scheduledFor?: Date;
    createdAt: Date;
}

export interface JobRole {
    id: string;
    title: string;
    description: string;
    department: string;
    createdAt: Date;
}

export interface Candidate {
    id: string;
    name: string;
    email: string;
    roleId: string;
    stage: CandidateStage;
    notes?: string;
    appliedAt: Date;
}

export interface FinancialData {
    id: string;
    monthlyRevenue: number;
    monthlyExpenses: number;
    cashInBank: number;
    month: string; // YYYY-MM format
    burnRate?: number;
    runway?: number;
}

export interface Investor {
    id: string;
    name: string;
    firm?: string;
    status: InvestorStatus;
    notes?: string;
    contactedAt: Date;
}

export interface Plugin {
    id: string;
    name: string;
    description: string;
    icon: string;
    connected: boolean;
}
