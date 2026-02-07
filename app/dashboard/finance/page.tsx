'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { mockFinancialData } from '@/lib/mock-data';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancePage() {
    const latestData = mockFinancialData[mockFinancialData.length - 1];

    const [monthlyRevenue, setMonthlyRevenue] = useState(latestData.monthlyRevenue);
    const [monthlyExpenses, setMonthlyExpenses] = useState(latestData.monthlyExpenses);
    const [cashInBank, setCashInBank] = useState(latestData.cashInBank);

    const burnRate = monthlyExpenses - monthlyRevenue;
    const runway = burnRate > 0 ? cashInBank / burnRate : 999;

    const chartData = mockFinancialData.map(d => ({
        month: d.month,
        revenue: d.monthlyRevenue / 1000,
        expenses: d.monthlyExpenses / 1000,
    }));

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">KPI & Runway Tracker</h1>
                <p className="mt-1 text-muted-foreground">
                    Monitor your financial health and key metrics
                </p>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Burn Rate</CardTitle>
                        <TrendingDown className="h-4 w-4 text-danger" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-danger">
                            ${burnRate.toLocaleString()}/mo
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Monthly cash burn
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Runway</CardTitle>
                        <TrendingUp className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">
                            {runway.toFixed(1)} months
                        </div>
                        <p className="text-xs text-muted-foreground">
                            At current burn rate
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash in Bank</CardTitle>
                        <DollarSign className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${cashInBank.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Available funds
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Input Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Update Financial Data</CardTitle>
                    <CardDescription>Enter your latest financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Monthly Revenue</label>
                            <Input
                                type="number"
                                value={monthlyRevenue}
                                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                                placeholder="50000"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Monthly Expenses</label>
                            <Input
                                type="number"
                                value={monthlyExpenses}
                                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                                placeholder="65000"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium">Cash in Bank</label>
                            <Input
                                type="number"
                                value={cashInBank}
                                onChange={(e) => setCashInBank(Number(e.target.value))}
                                placeholder="500000"
                            />
                        </div>
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue vs Expenses</CardTitle>
                        <CardDescription>Monthly comparison (in thousands)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Runway Projection</CardTitle>
                        <CardDescription>Based on current burn rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} name="Revenue" />
                                <Line type="monotone" dataKey="expenses" stroke="#8b5cf6" strokeWidth={2} name="Expenses" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
