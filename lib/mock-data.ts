import {
    Task,
    SocialContent,
    JobRole,
    Candidate,
    FinancialData,
    Investor,
    Plugin,
    Startup
} from './types';

// Mock Startup Data
export const mockStartup: Startup = {
    id: '1',
    name: 'AxiosLab Demo',
    stage: 'Seed',
    teamSize: 8,
    primaryGoal: 'growth',
    createdAt: new Date('2024-01-15'),
};

// Mock Tasks
export const mockTasks: Task[] = [
    {
        id: '1',
        title: 'Launch product hunt campaign',
        description: 'Prepare and execute Product Hunt launch strategy',
        category: 'Marketing',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2026-02-15'),
        createdAt: new Date('2026-02-01'),
    },
    {
        id: '2',
        title: 'Hire senior backend engineer',
        description: 'Find and onboard experienced backend developer',
        category: 'Hiring',
        status: 'todo',
        priority: 'high',
        dueDate: new Date('2026-03-01'),
        createdAt: new Date('2026-02-05'),
    },
    {
        id: '3',
        title: 'Implement user analytics',
        description: 'Set up Mixpanel and track key user events',
        category: 'Product',
        status: 'completed',
        priority: 'medium',
        createdAt: new Date('2026-01-20'),
    },
    {
        id: '4',
        title: 'Prepare pitch deck for investors',
        description: 'Update deck with latest metrics and traction',
        category: 'Fundraising',
        status: 'in-progress',
        priority: 'high',
        dueDate: new Date('2026-02-20'),
        createdAt: new Date('2026-02-03'),
    },
    {
        id: '5',
        title: 'Optimize landing page conversion',
        description: 'A/B test hero section and CTA buttons',
        category: 'Marketing',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date('2026-02-06'),
    },
];

// Mock Social Content
export const mockSocialContent: SocialContent[] = [
    {
        id: '1',
        platform: 'LinkedIn',
        contentType: 'post',
        topic: 'Product Launch',
        content: '🚀 Excited to announce our latest feature that helps startups track their runway in real-time! Managing finances has never been easier. #StartupLife #SaaS',
        scheduledFor: new Date('2026-02-10T10:00:00'),
        createdAt: new Date('2026-02-07'),
    },
    {
        id: '2',
        platform: 'Twitter/X',
        contentType: 'thread',
        topic: 'Startup Tips',
        content: '1/ Thread: 5 lessons we learned while building our startup 🧵\n\n2/ Always validate before building. We spent 3 months on a feature nobody wanted.\n\n3/ Hire slow, fire fast. Culture fit matters more than you think.',
        createdAt: new Date('2026-02-06'),
    },
];

// Mock Job Roles
export const mockJobRoles: JobRole[] = [
    {
        id: '1',
        title: 'Senior Backend Engineer',
        description: 'We are looking for an experienced backend engineer to help scale our infrastructure. You will work on building robust APIs, optimizing database queries, and ensuring system reliability.',
        department: 'Engineering',
        createdAt: new Date('2026-02-01'),
    },
    {
        id: '2',
        title: 'Product Designer',
        description: 'Join our design team to create beautiful, user-friendly interfaces. You will own the design process from research to final implementation.',
        department: 'Design',
        createdAt: new Date('2026-01-25'),
    },
];

// Mock Candidates
export const mockCandidates: Candidate[] = [
    {
        id: '1',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        roleId: '1',
        stage: 'Interview',
        notes: 'Strong technical background, 5 years at Google',
        appliedAt: new Date('2026-02-03'),
    },
    {
        id: '2',
        name: 'Michael Rodriguez',
        email: 'michael.r@example.com',
        roleId: '1',
        stage: 'Shortlisted',
        notes: 'Impressive portfolio, startup experience',
        appliedAt: new Date('2026-02-05'),
    },
    {
        id: '3',
        name: 'Emily Watson',
        email: 'emily.watson@example.com',
        roleId: '2',
        stage: 'Applied',
        appliedAt: new Date('2026-02-06'),
    },
    {
        id: '4',
        name: 'David Kim',
        email: 'david.kim@example.com',
        roleId: '1',
        stage: 'Hired',
        notes: 'Excellent culture fit, starts next month',
        appliedAt: new Date('2026-01-28'),
    },
];

// Mock Financial Data
export const mockFinancialData: FinancialData[] = [
    {
        id: '1',
        monthlyRevenue: 45000,
        monthlyExpenses: 65000,
        cashInBank: 520000,
        month: '2026-01',
        burnRate: 20000,
        runway: 26,
    },
    {
        id: '2',
        monthlyRevenue: 52000,
        monthlyExpenses: 68000,
        cashInBank: 504000,
        month: '2026-02',
        burnRate: 16000,
        runway: 31.5,
    },
];

// Mock Investors
export const mockInvestors: Investor[] = [
    {
        id: '1',
        name: 'Jessica Park',
        firm: 'Sequoia Capital',
        status: 'meeting',
        notes: 'Interested in our AI features, follow-up scheduled',
        contactedAt: new Date('2026-01-20'),
    },
    {
        id: '2',
        name: 'Robert Chen',
        firm: 'Andreessen Horowitz',
        status: 'contacted',
        notes: 'Initial email sent, waiting for response',
        contactedAt: new Date('2026-02-01'),
    },
    {
        id: '3',
        name: 'Amanda Foster',
        firm: 'Y Combinator',
        status: 'closed',
        notes: 'Passed on this round, keep in touch for Series A',
        contactedAt: new Date('2026-01-10'),
    },
];

// Mock Plugins
export const mockPlugins: Plugin[] = [
    {
        id: '1',
        name: 'Slack',
        description: 'Get notifications and updates in your Slack workspace',
        icon: 'MessageSquare',
        connected: true,
    },
    {
        id: '2',
        name: 'Notion',
        description: 'Sync tasks and documents with your Notion workspace',
        icon: 'FileText',
        connected: false,
    },
    {
        id: '3',
        name: 'Google Calendar',
        description: 'Sync meetings and deadlines with Google Calendar',
        icon: 'Calendar',
        connected: true,
    },
    {
        id: '4',
        name: 'LinkedIn',
        description: 'Auto-post content and track engagement on LinkedIn',
        icon: 'Linkedin',
        connected: false,
    },
];

// Activity Feed
export interface Activity {
    id: string;
    type: 'task' | 'hire' | 'finance' | 'investor' | 'content';
    title: string;
    description: string;
    timestamp: Date;
}

export const mockActivities: Activity[] = [
    {
        id: '1',
        type: 'task',
        title: 'Task completed',
        description: 'Implement user analytics marked as done',
        timestamp: new Date('2026-02-07T14:30:00'),
    },
    {
        id: '2',
        type: 'hire',
        title: 'New candidate',
        description: 'Emily Watson applied for Product Designer',
        timestamp: new Date('2026-02-06T16:45:00'),
    },
    {
        id: '3',
        type: 'content',
        title: 'Content scheduled',
        description: 'LinkedIn post scheduled for Feb 10',
        timestamp: new Date('2026-02-07T11:20:00'),
    },
    {
        id: '4',
        type: 'investor',
        title: 'Investor meeting',
        description: 'Follow-up scheduled with Jessica Park',
        timestamp: new Date('2026-02-05T09:00:00'),
    },
];
