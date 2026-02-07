'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle2, Circle, Sparkles, Plus, Loader2 } from 'lucide-react';
import { mockInvestors, mockFinancialData } from '@/lib/mock-data';
import { Investor, InvestorStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { aiService } from '@/lib/ai';

interface ChecklistItem {
    id: number;
    item: string;
    completed: boolean;
}

export default function FundraisingPage() {
    const [investors, setInvestors] = useState<Investor[]>(mockInvestors);
    const [aiAssessment, setAiAssessment] = useState<string>('');
    const [isAssessing, setIsAssessing] = useState(false);
    const [pitchNotes, setPitchNotes] = useState(`Key metrics to highlight:
- 3x MRR growth in last 6 months
- 95% customer retention rate
- $500K ARR milestone reached

Recent updates:
- Added competitive analysis slide
- Updated team slide with new hires
- Refined go-to-market strategy`);
    const [showAddInvestor, setShowAddInvestor] = useState(false);
    const [newInvestorName, setNewInvestorName] = useState('');
    const [newInvestorFirm, setNewInvestorFirm] = useState('');

    const [checklist, setChecklist] = useState<ChecklistItem[]>([
        { id: 1, item: 'Pitch deck prepared', completed: true },
        { id: 2, item: 'Financial projections (18-24 months)', completed: true },
        { id: 3, item: 'Cap table organized', completed: false },
        { id: 4, item: 'Data room set up', completed: false },
        { id: 5, item: 'Legal documents reviewed', completed: false },
        { id: 6, item: 'Investor list compiled', completed: true },
    ]);

    const toggleChecklistItem = (id: number) => {
        setChecklist(checklist.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const saveNotes = () => {
        // In a real app, this would save to a database
        alert('Notes saved successfully!');
    };

    const runAIReadinessCheck = async () => {
        setIsAssessing(true);
        try {
            const latestFinance = mockFinancialData[mockFinancialData.length - 1];
            const assessment = await aiService.assessFundraisingReadiness({
                revenue: latestFinance.monthlyRevenue,
                burnRate: latestFinance.burnRate || 0,
                runway: latestFinance.runway || 0,
                teamSize: 8, // Mock team size
            });
            setAiAssessment(assessment);
        } catch (error) {
            console.error('Failed to assess readiness:', error);
        } finally {
            setIsAssessing(false);
        }
    };

    const addInvestor = () => {
        if (!newInvestorName.trim() || !newInvestorFirm.trim()) return;

        const newInvestor: Investor = {
            id: Date.now().toString(),
            name: newInvestorName,
            firm: newInvestorFirm,
            status: 'contacted',
            notes: 'Recently added',
            contactedAt: new Date(),
        };

        setInvestors([...investors, newInvestor]);
        setNewInvestorName('');
        setNewInvestorFirm('');
        setShowAddInvestor(false);
    };

    const getStatusColor = (status: InvestorStatus) => {
        switch (status) {
            case 'contacted': return 'bg-muted text-muted-foreground';
            case 'meeting': return 'bg-warning/10 text-warning border-warning';
            case 'closed': return 'bg-success/10 text-success border-success';
        }
    };

    const getStatusLabel = (status: InvestorStatus) => {
        switch (status) {
            case 'contacted': return 'Contacted';
            case 'meeting': return 'In Discussion';
            case 'closed': return 'Closed';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Fundraising Assistant</h1>
                    <p className="mt-1 text-muted-foreground">
                        Track your fundraising progress and investor relationships
                    </p>
                </div>
                <Button
                    className="gap-2"
                    onClick={runAIReadinessCheck}
                    disabled={isAssessing}
                >
                    {isAssessing ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Assessing...
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4" />
                            AI Readiness Check
                        </>
                    )}
                </Button>
            </div>

            {/* AI Assessment Result */}
            {aiAssessment && (
                <Card className="border-primary/50 bg-primary/5">
                    <CardHeader>
                        <CardTitle>AI Fundraising Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="whitespace-pre-wrap text-sm">{aiAssessment}</pre>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Fundraising Checklist */}
                <Card>
                    <CardHeader>
                        <CardTitle>Fundraising Checklist</CardTitle>
                        <CardDescription>
                            {checklist.filter(i => i.completed).length} of {checklist.length} completed
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {checklist.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => toggleChecklistItem(item.id)}
                                    className="flex w-full items-center gap-3 text-left transition-opacity hover:opacity-80"
                                >
                                    {item.completed ? (
                                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    )}
                                    <span className={cn(
                                        'text-sm',
                                        item.completed ? 'text-foreground' : 'text-muted-foreground'
                                    )}>
                                        {item.item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pitch Deck Notes */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pitch Deck Notes</CardTitle>
                        <CardDescription>Key points and updates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <textarea
                            className="min-h-[200px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Add notes about your pitch deck, key metrics to highlight, or feedback from investors..."
                            value={pitchNotes}
                            onChange={(e) => setPitchNotes(e.target.value)}
                        />
                        <Button onClick={saveNotes} className="w-full">
                            Save Notes
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Investor Tracking */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Investor Pipeline</CardTitle>
                            <CardDescription>{investors.length} investors tracked</CardDescription>
                        </div>
                        <Button
                            onClick={() => setShowAddInvestor(!showAddInvestor)}
                            variant="outline"
                            className="gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Investor
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Add Investor Form */}
                    {showAddInvestor && (
                        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
                            <div className="grid gap-3 md:grid-cols-2">
                                <Input
                                    placeholder="Investor name"
                                    value={newInvestorName}
                                    onChange={(e) => setNewInvestorName(e.target.value)}
                                />
                                <Input
                                    placeholder="Firm name"
                                    value={newInvestorFirm}
                                    onChange={(e) => setNewInvestorFirm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={addInvestor} className="flex-1">
                                    Add
                                </Button>
                                <Button
                                    onClick={() => setShowAddInvestor(false)}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Investor Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="pb-3 text-left text-sm font-medium">Investor</th>
                                    <th className="pb-3 text-left text-sm font-medium">Firm</th>
                                    <th className="pb-3 text-left text-sm font-medium">Status</th>
                                    <th className="pb-3 text-left text-sm font-medium">Notes</th>
                                    <th className="pb-3 text-left text-sm font-medium">Contacted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {investors.map(investor => (
                                    <tr key={investor.id} className="border-b border-border">
                                        <td className="py-3 text-sm font-medium">{investor.name}</td>
                                        <td className="py-3 text-sm text-muted-foreground">{investor.firm}</td>
                                        <td className="py-3">
                                            <span className={cn(
                                                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold',
                                                getStatusColor(investor.status)
                                            )}>
                                                {getStatusLabel(investor.status)}
                                            </span>
                                        </td>
                                        <td className="py-3 text-sm text-muted-foreground">
                                            {investor.notes}
                                        </td>
                                        <td className="py-3 text-sm text-muted-foreground">
                                            {new Date(investor.contactedAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
