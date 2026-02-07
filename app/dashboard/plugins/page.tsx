'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, Calendar, Linkedin, CheckCircle2, XCircle } from 'lucide-react';
import { mockPlugins } from '@/lib/mock-data';
import { Plugin } from '@/lib/types';
import { cn } from '@/lib/utils';

const iconMap: Record<string, any> = {
    MessageSquare,
    FileText,
    Calendar,
    Linkedin,
};

export default function PluginsPage() {
    const [plugins, setPlugins] = useState<Plugin[]>(mockPlugins);

    const togglePlugin = (pluginId: string) => {
        setPlugins(plugins.map(plugin =>
            plugin.id === pluginId
                ? { ...plugin, connected: !plugin.connected }
                : plugin
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Integrations & Plugins</h1>
                <p className="mt-1 text-muted-foreground">
                    Connect your favorite tools to enhance your workflow
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Plugins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{plugins.length}</div>
                        <p className="text-xs text-muted-foreground">Available integrations</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Connected</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-success" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-success">
                            {plugins.filter(p => p.connected).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Active connections</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available</CardTitle>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {plugins.filter(p => !p.connected).length}
                        </div>
                        <p className="text-xs text-muted-foreground">Ready to connect</p>
                    </CardContent>
                </Card>
            </div>

            {/* Plugins Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plugins.map(plugin => {
                    const Icon = iconMap[plugin.icon] || MessageSquare;
                    return (
                        <Card key={plugin.id} className={cn(
                            'transition-all',
                            plugin.connected && 'border-primary/50 bg-primary/5'
                        )}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'flex h-10 w-10 items-center justify-center rounded-lg',
                                            plugin.connected
                                                ? 'bg-gradient-to-br from-primary to-secondary'
                                                : 'bg-muted'
                                        )}>
                                            <Icon className={cn(
                                                'h-5 w-5',
                                                plugin.connected ? 'text-white' : 'text-muted-foreground'
                                            )} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{plugin.name}</CardTitle>
                                            <div className="mt-1 flex items-center gap-1">
                                                <div className={cn(
                                                    'h-2 w-2 rounded-full',
                                                    plugin.connected ? 'bg-success' : 'bg-muted-foreground'
                                                )} />
                                                <span className="text-xs text-muted-foreground">
                                                    {plugin.connected ? 'Connected' : 'Not connected'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="mb-4">
                                    {plugin.description}
                                </CardDescription>
                                <Button
                                    variant={plugin.connected ? 'outline' : 'primary'}
                                    size="sm"
                                    className="w-full"
                                    onClick={() => togglePlugin(plugin.id)}
                                >
                                    {plugin.connected ? 'Disconnect' : 'Connect'}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Coming Soon */}
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>More integrations on the way</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-3 md:grid-cols-4">
                        {['GitHub', 'Stripe', 'HubSpot', 'Zapier'].map(name => (
                            <div key={name} className="flex items-center gap-2 rounded-lg border border-dashed border-border p-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        {name[0]}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground">{name}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
