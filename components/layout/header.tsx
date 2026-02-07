'use client';

import { Bell, Search, User, Sun, Moon, LogOut, CheckCircle2, UserPlus, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();
    const [notificationCount, setNotificationCount] = useState(3);

    // Sample notifications
    const notifications = [
        {
            id: 1,
            icon: CheckCircle2,
            title: 'Task completed',
            description: 'Implement user analytics marked as done',
            time: '2 hours ago',
        },
        {
            id: 2,
            icon: UserPlus,
            title: 'New candidate',
            description: 'Emily Watson applied for Product Designer',
            time: '5 hours ago',
        },
        {
            id: 3,
            icon: TrendingUp,
            title: 'Revenue milestone',
            description: 'Monthly revenue reached $50,000',
            time: '1 day ago',
        },
    ];

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    const handleNotificationClick = () => {
        setNotificationCount(0);
    };

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
            {/* Search */}
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search tasks, candidates, investors..."
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                {mounted && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="relative"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </Button>
                )}

                {/* Notifications Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="relative"
                            onClick={handleNotificationClick}
                        >
                            <Bell className="h-5 w-5" />
                            {notificationCount > 0 && (
                                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-black">
                                    {notificationCount}
                                </span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => {
                            const Icon = notification.icon;
                            return (
                                <DropdownMenuItem key={notification.id} className="flex gap-3 p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{notification.title}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {notification.description}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {notification.time}
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            );
                        })}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-sm text-primary">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-px bg-border" />

                {/* User Info */}
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-yellow">
                        <User className="h-4 w-4 text-black" />
                    </div>
                    <span className="text-sm font-medium">
                        {session?.user?.name || 'User'}
                    </span>
                </div>

                {/* Logout Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </header>
    );
}
