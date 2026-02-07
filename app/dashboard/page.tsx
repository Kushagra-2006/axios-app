'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CheckSquare,
    Megaphone,
    Users,
    TrendingUp,
    ArrowUp,
    ArrowDown,
    Clock
} from 'lucide-react';
import { mockTasks, mockCandidates, mockFinancialData, mockActivities } from '@/lib/mock-data';

export default function DashboardPage() {
    const latestFinance = mockFinancialData[mockFinancialData.length - 1];
    const tasksInProgress = mockTasks.filter(t => t.status === 'in-progress').length;
    const candidatesInPipeline = mockCandidates.filter(c => c.stage !== 'Hired').length;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-1 text-muted-foreground">
                    Welcome back! Here's what's happening with your startup.
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Tasks */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tasksInProgress}</div>
                        <p className="text-xs text-muted-foreground">
                            {mockTasks.length} total tasks
                        </p>
                    </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Content Scheduled</CardTitle>
                        <Megaphone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            This week
                        </p>
                    </CardContent>
                </Card>

                {/* Hiring */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Candidates</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{candidatesInPipeline}</div>
                        <p className="text-xs text-muted-foreground">
                            In pipeline
                        </p>
                    </CardContent>
                </Card>

                {/* Runway */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Runway</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestFinance.runway?.toFixed(1)} mo</div>
                        <p className="text-xs text-success flex items-center gap-1">
                            <ArrowUp className="h-3 w-3" />
                            +5.5 months
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockActivities.slice(0, 5).map((activity) => (
                                <div key={activity.id} className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                        {activity.type === 'task' && <CheckSquare className="h-4 w-4 text-primary" />}
                                        {activity.type === 'hire' && <Users className="h-4 w-4 text-primary" />}
                                        {activity.type === 'content' && <Megaphone className="h-4 w-4 text-primary" />}
                                        {activity.type === 'investor' && <TrendingUp className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-sm font-medium">{activity.title}</p>
                                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span suppressHydrationWarning>
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Financial Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Financial Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                                <span className="text-lg font-semibold text-success">
                                    ${latestFinance.monthlyRevenue.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Monthly Expenses</span>
                                <span className="text-lg font-semibold text-danger">
                                    ${latestFinance.monthlyExpenses.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Cash in Bank</span>
                                <span className="text-lg font-semibold">
                                    ${latestFinance.cashInBank.toLocaleString()}
                                </span>
                            </div>
                            <div className="border-t border-border pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Burn Rate</span>
                                    <span className="text-lg font-bold text-warning flex items-center gap-1">
                                        <ArrowDown className="h-4 w-4" />
                                        ${latestFinance.burnRate?.toLocaleString()}/mo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
