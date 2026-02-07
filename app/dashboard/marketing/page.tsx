'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Loader2, Edit2, Trash2 } from 'lucide-react';
import { SocialPlatform, ContentType } from '@/lib/types';
import { aiService } from '@/lib/ai';
import { cn } from '@/lib/utils';

interface ScheduledPost {
    id: string;
    platform: SocialPlatform;
    contentType: ContentType;
    content: string;
    scheduledDate: Date;
}

export default function MarketingPage() {
    const [platform, setPlatform] = useState<SocialPlatform>('LinkedIn');
    const [contentType, setContentType] = useState<ContentType>('post');
    const [topic, setTopic] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
        {
            id: '1',
            platform: 'LinkedIn',
            contentType: 'post',
            content: 'Product Launch announcement',
            scheduledDate: new Date('2026-02-10T10:00:00'),
        },
    ]);
    const [editingContent, setEditingContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const platforms: SocialPlatform[] = ['LinkedIn', 'Twitter/X', 'Instagram'];
    const contentTypes: ContentType[] = ['post', 'thread', 'caption'];

    const generateContent = async () => {
        if (!topic.trim()) return;

        setIsGenerating(true);
        try {
            const content = await aiService.generateSocialContent({
                platform,
                contentType,
                topic,
            });
            setGeneratedContent(content);
            setEditingContent(content);
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    const schedulePost = () => {
        if (!generatedContent) return;

        const newPost: ScheduledPost = {
            id: Date.now().toString(),
            platform,
            contentType,
            content: editingContent || generatedContent,
            scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        };

        setScheduledPosts([...scheduledPosts, newPost]);
        setGeneratedContent('');
        setEditingContent('');
        setTopic('');
        setIsEditing(false);
    };

    const deleteScheduledPost = (id: string) => {
        setScheduledPosts(scheduledPosts.filter(post => post.id !== id));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            setEditingContent(generatedContent);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">AI Marketing Assistant</h1>
                <p className="mt-1 text-muted-foreground">
                    Generate engaging social media content with AI
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Content Generator */}
                <Card>
                    <CardHeader>
                        <CardTitle>Content Generator</CardTitle>
                        <CardDescription>Create platform-specific content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium">Platform</label>
                            <div className="grid grid-cols-3 gap-2">
                                {platforms.map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPlatform(p)}
                                        className={cn(
                                            'rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all',
                                            platform === p
                                                ? 'border-primary bg-primary text-primary-foreground'
                                                : 'border-border hover:border-primary/50'
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Content Type</label>
                            <div className="grid grid-cols-3 gap-2">
                                {contentTypes.map(ct => (
                                    <button
                                        key={ct}
                                        onClick={() => setContentType(ct)}
                                        className={cn(
                                            'rounded-lg border-2 px-3 py-2 text-sm font-medium capitalize transition-all',
                                            contentType === ct
                                                ? 'border-secondary bg-secondary text-secondary-foreground'
                                                : 'border-border hover:border-secondary/50'
                                        )}
                                    >
                                        {ct}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium">Topic</label>
                            <Input
                                placeholder="What do you want to talk about?"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && generateContent()}
                            />
                        </div>

                        <Button
                            onClick={generateContent}
                            disabled={isGenerating || !topic.trim()}
                            className="w-full gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Generate Content
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Content Preview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Preview</CardTitle>
                        <CardDescription>
                            {platform} • {contentType}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {generatedContent ? (
                            <div className="space-y-4">
                                <div className="rounded-lg border border-border bg-muted/50 p-4">
                                    {isEditing ? (
                                        <textarea
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            className="w-full min-h-[200px] bg-transparent text-sm focus:outline-none resize-none"
                                        />
                                    ) : (
                                        <p className="whitespace-pre-wrap text-sm">{editingContent || generatedContent}</p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1 gap-2"
                                        onClick={toggleEdit}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                        {isEditing ? 'Done' : 'Edit'}
                                    </Button>
                                    <Button
                                        className="flex-1"
                                        onClick={schedulePost}
                                    >
                                        Schedule Post
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-border">
                                <p className="text-sm text-muted-foreground">
                                    Generated content will appear here
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Scheduled Content */}
            <Card>
                <CardHeader>
                    <CardTitle>Scheduled Content</CardTitle>
                    <CardDescription>Your upcoming posts ({scheduledPosts.length})</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {scheduledPosts.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No scheduled posts yet</p>
                        ) : (
                            scheduledPosts.map(post => (
                                <div key={post.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{post.platform} {post.contentType}</p>
                                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                                                Scheduled
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.content}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                {post.scheduledDate.toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {post.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => deleteScheduledPost(post.id)}
                                            className="text-danger hover:text-danger"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
