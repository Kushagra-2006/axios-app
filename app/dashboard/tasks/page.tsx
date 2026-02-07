'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, CheckCircle2, Circle, Clock, Trash2, Sparkles } from 'lucide-react';
import { mockTasks } from '@/lib/mock-data';
import { Task, TaskCategory, TaskStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { prioritizeTasks } from '@/lib/ai';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TaskCategory>('Marketing');
    const [isPrioritizing, setIsPrioritizing] = useState(false);

    const categories: TaskCategory[] = ['Marketing', 'Hiring', 'Product', 'Fundraising'];

    const addTask = () => {
        if (!newTaskTitle.trim()) return;

        const newTask: Task = {
            id: Date.now().toString(),
            title: newTaskTitle,
            category: selectedCategory,
            status: 'todo',
            priority: 'medium',
            createdAt: new Date(),
        };

        setTasks([...tasks, newTask]);
        setNewTaskTitle('');
    };

    const toggleTaskStatus = (taskId: string) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newStatus: TaskStatus =
                    task.status === 'todo' ? 'in-progress' :
                        task.status === 'in-progress' ? 'completed' : 'todo';
                return { ...task, status: newStatus };
            }
            return task;
        }));
    };

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const handleAIPrioritize = async () => {
        setIsPrioritizing(true);
        try {
            const prioritizedTasks = await prioritizeTasks(tasks);
            setTasks(prioritizedTasks);
        } catch (error) {
            console.error('Failed to prioritize tasks:', error);
        } finally {
            setIsPrioritizing(false);
        }
    };

    const getTasksByCategory = (category: TaskCategory) => {
        return tasks.filter(task => task.category === category);
    };

    const getStatusIcon = (status: TaskStatus) => {
        if (status === 'completed') return <CheckCircle2 className="h-5 w-5 text-success" />;
        if (status === 'in-progress') return <Clock className="h-5 w-5 text-warning" />;
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Tasks & Goals</h1>
                    <p className="mt-1 text-muted-foreground">
                        Manage your startup tasks and get AI-powered prioritization
                    </p>
                </div>
                <Button
                    className="gap-2"
                    onClick={handleAIPrioritize}
                    disabled={isPrioritizing}
                >
                    <Sparkles className="h-4 w-4" />
                    {isPrioritizing ? 'Prioritizing...' : 'AI Prioritize'}
                </Button>
            </div>

            {/* Add Task */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-3">
                        <Input
                            placeholder="Task title..."
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addTask()}
                            className="flex-1"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as TaskCategory)}
                            className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <Button onClick={addTask} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Task
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks by Category */}
            <div className="grid gap-6 lg:grid-cols-2">
                {categories.map(category => {
                    const categoryTasks = getTasksByCategory(category);
                    return (
                        <Card key={category}>
                            <CardHeader>
                                <CardTitle>{category}</CardTitle>
                                <CardDescription>{categoryTasks.length} tasks</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {categoryTasks.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">No tasks yet</p>
                                    ) : (
                                        categoryTasks.map(task => (
                                            <div
                                                key={task.id}
                                                className={cn(
                                                    'flex items-start gap-3 rounded-lg border border-border p-3 transition-all',
                                                    task.status === 'completed' && 'opacity-60'
                                                )}
                                            >
                                                <button
                                                    onClick={() => toggleTaskStatus(task.id)}
                                                    className="mt-0.5"
                                                >
                                                    {getStatusIcon(task.status)}
                                                </button>
                                                <div className="flex-1 space-y-1">
                                                    <p className={cn(
                                                        'text-sm font-medium',
                                                        task.status === 'completed' && 'line-through'
                                                    )}>
                                                        {task.title}
                                                    </p>
                                                    {task.description && (
                                                        <p className="text-xs text-muted-foreground">{task.description}</p>
                                                    )}
                                                    {task.dueDate && (
                                                        <p className="text-xs text-muted-foreground">
                                                            Due: {new Date(task.dueDate).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => deleteTask(task.id)}
                                                    className="text-danger hover:text-danger"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
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
    );
}
