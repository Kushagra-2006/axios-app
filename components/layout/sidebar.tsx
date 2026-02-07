'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { LayoutDashboard, CheckSquare, Megaphone, Users, DollarSign, TrendingUp, Plug } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks & Goals', href: '/dashboard/tasks', icon: CheckSquare },
    { name: 'AI Marketing', href: '/dashboard/marketing', icon: Megaphone },
    { name: 'Recruitment', href: '/dashboard/recruitment', icon: Users },
    { name: 'KPI & Runway', href: '/dashboard/finance', icon: TrendingUp },
    { name: 'Fundraising', href: '/dashboard/fundraising', icon: DollarSign },
    { name: 'Plugins', href: '/dashboard/plugins', icon: Plug },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-64 flex-col border-r border-border bg-card">
            {/* Logo */}
            <div className="flex h-16 items-center gap-3 border-b border-border px-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                    <Image
                        src="/axios-logo.png"
                        alt="AxiosLabs Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                </div>
                <div>
                    <h1 className="text-lg font-bold">AxiosLab</h1>
                    <p className="text-xs text-muted-foreground">AI Co-Founder</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                                isActive
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-border p-4">
                <div className="rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
                    <p className="text-xs font-medium text-foreground">AI Co-Founder</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Your startup management assistant
                    </p>
                </div>
            </div>
        </aside>
    );
}
