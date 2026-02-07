'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Sparkles, User, Loader2 } from 'lucide-react';
import { mockJobRoles, mockCandidates } from '@/lib/mock-data';
import { JobRole, Candidate, CandidateStage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { aiService } from '@/lib/ai';

export default function RecruitmentPage() {
    const [jobRoles, setJobRoles] = useState<JobRole[]>(mockJobRoles);
    const [candidates] = useState<Candidate[]>(mockCandidates);
    const [showAddRole, setShowAddRole] = useState(false);
    const [newRoleTitle, setNewRoleTitle] = useState('');
    const [newRoleDepartment, setNewRoleDepartment] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatingRoleId, setGeneratingRoleId] = useState<string | null>(null);

    const stages: CandidateStage[] = ['Applied', 'Shortlisted', 'Interview', 'Hired'];

    const getCandidatesByStage = (stage: CandidateStage) => {
        return candidates.filter(c => c.stage === stage);
    };

    const getStageColor = (stage: CandidateStage) => {
        switch (stage) {
            case 'Applied': return 'bg-muted text-muted-foreground';
            case 'Shortlisted': return 'bg-primary/10 text-primary';
            case 'Interview': return 'bg-warning/10 text-warning';
            case 'Hired': return 'bg-success/10 text-success';
        }
    };

    const generateJobDescription = async (roleId: string, title: string, department: string) => {
        setGeneratingRoleId(roleId);
        setIsGenerating(true);
        try {
            const description = await aiService.generateJobDescription({ title, department });
            setJobRoles(jobRoles.map(role =>
                role.id === roleId ? { ...role, description } : role
            ));
        } catch (error) {
            console.error('Failed to generate job description:', error);
        } finally {
            setIsGenerating(false);
            setGeneratingRoleId(null);
        }
    };

    const addJobRole = async () => {
        if (!newRoleTitle.trim() || !newRoleDepartment.trim()) return;

        const newRole: JobRole = {
            id: Date.now().toString(),
            title: newRoleTitle,
            department: newRoleDepartment,
            description: 'Generating AI description...',
            createdAt: new Date(),
        };

        setJobRoles([...jobRoles, newRole]);
        setShowAddRole(false);

        // Generate AI description for the new role
        await generateJobDescription(newRole.id, newRoleTitle, newRoleDepartment);

        setNewRoleTitle('');
        setNewRoleDepartment('');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Recruitment Assistant</h1>
                    <p className="mt-1 text-muted-foreground">
                        Manage job roles and candidates with AI-powered screening
                    </p>
                </div>
                <Button
                    className="gap-2"
                    onClick={() => setShowAddRole(!showAddRole)}
                >
                    <Plus className="h-4 w-4" />
                    New Job Role
                </Button>
            </div>

            {/* Add Job Role Form */}
            {showAddRole && (
                <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle>Add New Job Role</CardTitle>
                        <CardDescription>AI will generate a job description for you</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid gap-3 md:grid-cols-2">
                            <Input
                                placeholder="Job title (e.g., Senior Frontend Engineer)"
                                value={newRoleTitle}
                                onChange={(e) => setNewRoleTitle(e.target.value)}
                            />
                            <Input
                                placeholder="Department (e.g., Engineering)"
                                value={newRoleDepartment}
                                onChange={(e) => setNewRoleDepartment(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={addJobRole} className="flex-1">
                                Create Role
                            </Button>
                            <Button
                                onClick={() => setShowAddRole(false)}
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Job Roles */}
            <Card>
                <CardHeader>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>{jobRoles.length} active roles</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {jobRoles.map(role => (
                            <div key={role.id} className="flex items-start justify-between rounded-lg border border-border p-4">
                                <div className="flex-1">
                                    <h3 className="font-semibold">{role.title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">{role.department}</p>
                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {role.description}
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => generateJobDescription(role.id, role.title, role.department)}
                                    disabled={isGenerating && generatingRoleId === role.id}
                                >
                                    {isGenerating && generatingRoleId === role.id ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles className="h-4 w-4" />
                                            AI Improve
                                        </>
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Candidate Pipeline */}
            <div>
                <h2 className="mb-4 text-xl font-semibold">Candidate Pipeline</h2>
                <div className="grid gap-4 lg:grid-cols-4">
                    {stages.map(stage => {
                        const stageCandidates = getCandidatesByStage(stage);
                        return (
                            <Card key={stage}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base">{stage}</CardTitle>
                                        <span className={cn(
                                            'flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold',
                                            getStageColor(stage)
                                        )}>
                                            {stageCandidates.length}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {stageCandidates.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">No candidates</p>
                                        ) : (
                                            stageCandidates.map(candidate => (
                                                <div
                                                    key={candidate.id}
                                                    className="rounded-lg border border-border bg-card p-3 transition-all hover:shadow-md"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
                                                            <User className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-medium">{candidate.name}</p>
                                                            <p className="text-xs text-muted-foreground">{candidate.email}</p>
                                                            {candidate.notes && (
                                                                <p className="mt-2 text-xs text-muted-foreground">
                                                                    {candidate.notes}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
