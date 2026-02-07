// AI Service - OpenAI Integration
// For MVP, this will return mock responses. Can be connected to real OpenAI API later.

export interface AIGenerateContentParams {
    platform: string;
    contentType: string;
    topic?: string;
}

export interface AIGenerateJobDescriptionParams {
    title: string;
    department: string;
}

export interface AITaskPrioritizationParams {
    tasks: Array<{
        id: string;
        title: string;
        category: string;
        dueDate?: Date;
    }>;
}

export class AIService {
    private apiKey: string | null;

    constructor(apiKey?: string) {
        this.apiKey = apiKey || null;
    }

    async generateSocialContent(params: AIGenerateContentParams): Promise<string> {
        // Mock AI response for MVP
        await this.delay(1500); // Simulate API call

        const { platform, contentType, topic } = params;

        if (contentType === 'thread') {
            return `1/ ${topic ? `Let's talk about ${topic}` : 'Here\'s an important thread'} 🧵\n\n2/ First insight: Focus on solving real problems, not building features.\n\n3/ Second insight: Talk to your users every single day.\n\n4/ Third insight: Ship fast, iterate faster.\n\n5/ What\'s your biggest learning? Drop it below 👇`;
        }

        if (platform === 'LinkedIn') {
            return `🚀 ${topic ? `Exciting news about ${topic}!` : 'Big announcement!'}\n\nWe\'ve been working hard behind the scenes, and today we\'re thrilled to share our progress with you.\n\nKey highlights:\n✅ Improved performance by 3x\n✅ New features based on your feedback\n✅ Better user experience\n\nWhat do you think? Let us know in the comments!\n\n#StartupLife #SaaS #Innovation`;
        }

        if (platform === 'Twitter/X') {
            return `${topic ? `Just shipped: ${topic}` : 'New feature alert!'} 🎉\n\nThis is going to change the game for early-stage startups.\n\nTry it out and let us know what you think 👇`;
        }

        if (platform === 'Instagram') {
            return `${topic ? topic : 'Behind the scenes'} ✨\n\nBuilding a startup is a journey, not a destination.\n\nHere\'s what we learned this week:\n• Stay focused on your vision\n• Listen to your customers\n• Celebrate small wins\n\n#StartupJourney #Entrepreneurship #BuildInPublic`;
        }

        return `Great content about ${topic || 'your startup'}! Share your story and connect with your audience.`;
    }

    async generateJobDescription(params: AIGenerateJobDescriptionParams): Promise<string> {
        // Mock AI response for MVP
        await this.delay(1500);

        const { title, department } = params;

        return `We are looking for a talented ${title} to join our ${department} team.

**About the Role:**
As a ${title}, you will play a crucial role in shaping our product and driving our mission forward. You'll work closely with a passionate team of builders who are committed to creating exceptional experiences.

**Responsibilities:**
• Lead key initiatives and drive results
• Collaborate with cross-functional teams
• Contribute to strategic planning and execution
• Mentor junior team members
• Stay updated with industry trends and best practices

**Requirements:**
• 3+ years of relevant experience
• Strong problem-solving skills
• Excellent communication abilities
• Passion for startups and fast-paced environments
• Bachelor's degree or equivalent experience

**Nice to Have:**
• Experience in early-stage startups
• Track record of shipping successful projects
• Open source contributions

**What We Offer:**
• Competitive salary and equity
• Flexible work environment
• Health benefits
• Learning and development budget
• Amazing team culture

If you're excited about this opportunity, we'd love to hear from you!`;
    }

    async prioritizeTasks(params: AITaskPrioritizationParams): Promise<string[]> {
        // Mock AI response - returns task IDs in priority order
        await this.delay(1000);

        const { tasks } = params;

        // Simple mock prioritization: high priority items with due dates first
        const sorted = [...tasks].sort((a, b) => {
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;
            if (a.dueDate && b.dueDate) {
                return a.dueDate.getTime() - b.dueDate.getTime();
            }
            return 0;
        });

        return sorted.map(t => t.id);
    }

    async analyzeCandidateResume(resumeText: string): Promise<string> {
        // Mock AI screening summary
        await this.delay(1500);

        return `**AI Screening Summary:**

**Strengths:**
• Strong technical background with relevant experience
• Demonstrated leadership in previous roles
• Good cultural fit based on application responses

**Key Skills:**
• Technical expertise in required areas
• Problem-solving abilities
• Communication skills

**Recommendation:**
Move to shortlist for further review. Candidate shows promise and aligns with role requirements.

**Next Steps:**
Schedule initial screening call to assess cultural fit and discuss expectations.`;
    }

    async assessFundraisingReadiness(data: {
        revenue: number;
        burnRate: number;
        runway: number;
        teamSize: number;
    }): Promise<string> {
        await this.delay(1000);

        const { revenue, burnRate, runway, teamSize } = data;

        let readinessScore = 0;
        const feedback: string[] = [];

        if (runway > 12) {
            readinessScore += 25;
            feedback.push('✅ Strong runway position (12+ months)');
        } else if (runway > 6) {
            readinessScore += 15;
            feedback.push('⚠️ Moderate runway (6-12 months) - consider fundraising soon');
        } else {
            readinessScore += 5;
            feedback.push('🚨 Low runway (<6 months) - prioritize fundraising immediately');
        }

        if (revenue > 50000) {
            readinessScore += 30;
            feedback.push('✅ Strong revenue traction ($50K+ MRR)');
        } else if (revenue > 10000) {
            readinessScore += 20;
            feedback.push('⚠️ Growing revenue ($10K-$50K MRR) - focus on growth metrics');
        } else {
            readinessScore += 10;
            feedback.push('⚠️ Early revenue stage - emphasize product-market fit');
        }

        if (teamSize >= 5) {
            readinessScore += 20;
            feedback.push('✅ Team size appropriate for seed stage');
        } else {
            readinessScore += 10;
            feedback.push('⚠️ Small team - highlight key hires planned');
        }

        readinessScore += 25; // Base score for having the basics

        return `**Fundraising Readiness Assessment**

**Overall Score: ${readinessScore}/100**

${feedback.join('\n')}

**Recommendations:**
${readinessScore >= 70 ? '• You\'re in a strong position to raise. Focus on refining your pitch and building investor pipeline.' : ''}
${readinessScore < 70 && readinessScore >= 50 ? '• Work on improving key metrics before approaching top-tier investors. Consider angel investors or accelerators.' : ''}
${readinessScore < 50 ? '• Focus on product development and early traction before fundraising. Consider bootstrapping or grants.' : ''}
• Prepare detailed financial projections for 18-24 months
• Document your competitive advantages clearly
• Build relationships with investors before you need money`;
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export singleton instance
export const aiService = new AIService();

// Helper function to prioritize tasks
export async function prioritizeTasks<T extends { id: string; title: string; category: string; dueDate?: Date }>(tasks: T[]): Promise<T[]> {
    const prioritizedIds = await aiService.prioritizeTasks({ tasks });

    // Reorder tasks based on prioritized IDs
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    const prioritized: T[] = [];

    for (const id of prioritizedIds) {
        const task = taskMap.get(id);
        if (task) {
            prioritized.push(task);
            taskMap.delete(id);
        }
    }

    // Add any remaining tasks that weren't in the prioritized list
    prioritized.push(...Array.from(taskMap.values()));

    return prioritized;
}
