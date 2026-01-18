"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/contexts";
import { toast } from "sonner";
import {
    Loader2,
    TrendingUp,
    ArrowRight,
    Copy,
    RefreshCw,
    Linkedin,
    Mail,
    FileText,
    Lock,
} from "lucide-react";
import Link from "next/link";

// Form schema
const storyFormSchema = z.object({
    story: z
        .string()
        .min(100, "Please provide at least 100 characters")
        .max(5000, "Please keep your story under 5000 characters"),
    tone: z.enum(["professional", "conversational", "inspiring"]),
});

type StoryFormData = z.infer<typeof storyFormSchema>;

interface ContentOutput {
    linkedin: {
        hook: string;
        body: string;
        lesson: string;
        cta: string;
        hashtags: string[];
    };
    newsletter: {
        subjectLines: string[];
        opening: string;
        body: string;
        takeaways: string[];
        signoff: string;
    };
    coldEmail: {
        subjectLine: string;
        opening: string;
        value: string;
        cta: string;
    };
}

export function AuthorityEngineContent() {
    const { hasTool } = useUser();
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<ContentOutput | null>(null);
    const [activeTab, setActiveTab] = useState<"linkedin" | "newsletter" | "email">("linkedin");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<StoryFormData>({
        resolver: zodResolver(storyFormSchema),
        defaultValues: {
            tone: "professional",
        },
    });

    const storyValue = watch("story", "");
    const charCount = storyValue.length;

    // Check access
    if (!hasTool("authority")) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-navy-400" />
                </div>
                <h1 className="text-h1 text-navy-800 mb-4">Authority Engine</h1>
                <p className="text-navy-600 mb-8">
                    This AI tool is available exclusively to Launchpad members.
                </p>
                <Link href="/launchpad" className="btn btn-primary">
                    Upgrade to Launchpad
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    const onSubmit = async (data: StoryFormData) => {
        try {
            setIsGenerating(true);
            setResult(null);

            const response = await fetch("/api/ai/authority-engine", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to generate content");
            }

            const output = await response.json();
            setResult(output);
            toast.success("Your content has been generated!");
        } catch (error) {
            console.error("Generation error:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to generate. Please try again."
            );
        } finally {
            setIsGenerating(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const formatLinkedInPost = () => {
        if (!result) return "";
        const { hook, body, lesson, cta, hashtags } = result.linkedin;
        return `${hook}\n\n${body}\n\n${lesson}\n\n${cta}\n\n${hashtags.map(t => `#${t}`).join(" ")}`;
    };

    const formatNewsletter = () => {
        if (!result) return "";
        const { opening, body, takeaways, signoff } = result.newsletter;
        return `${opening}\n\n${body}\n\n${takeaways.map((t, i) => `${i + 1}. ${t}`).join("\n")}\n\n${signoff}`;
    };

    const formatColdEmail = () => {
        if (!result) return "";
        const { subjectLine, opening, value, cta } = result.coldEmail;
        return `Subject: ${subjectLine}\n\n${opening}\n\n${value}\n\n${cta}`;
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-h1 text-navy-800">Authority Engine</h1>
                        <p className="text-navy-500">Turn your stories into content</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="card">
                    <h2 className="text-h2 text-navy-800 mb-4">Your Story</h2>
                    <p className="text-navy-600 mb-6">
                        Share a career story, lesson, or insight. The AI will transform it
                        into polished content for LinkedIn, newsletters, and cold emails.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="label">Tone</label>
                            <select {...register("tone")} className="input">
                                <option value="professional">Professional</option>
                                <option value="conversational">Conversational</option>
                                <option value="inspiring">Inspiring</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">Your Story</label>
                            <textarea
                                {...register("story")}
                                rows={10}
                                placeholder="Example: In 1998, I took over a struggling plant with 40% defect rates. Everyone said to fire the workers, but instead I spent a week on the floor learning their names. I discovered the machines were miscalibrated, not the people. Within 6 months, defects dropped to 2%. The lesson? Problems often hide in places different from where leaders first look..."
                                className={`input resize-none ${errors.story ? "input-error" : ""}`}
                                disabled={isGenerating}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.story ? (
                                    <p className="error-message">{errors.story.message}</p>
                                ) : (
                                    <p className="text-sm text-navy-500">Minimum 100 characters</p>
                                )}
                                <p className="text-sm text-navy-500">{charCount}/5000</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="w-full btn btn-primary text-lg"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Generating Content...
                                </>
                            ) : (
                                <>
                                    <TrendingUp className="w-5 h-5" />
                                    Generate Content
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-h2 text-navy-800">Generated Content</h2>
                        {result && (
                            <button
                                onClick={() => setResult(null)}
                                className="text-sm text-navy-500 hover:text-navy-700 flex items-center gap-1"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-4 border-b border-navy-200">
                        <button
                            onClick={() => setActiveTab("linkedin")}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px ${activeTab === "linkedin"
                                ? "border-navy-800 text-navy-800"
                                : "border-transparent text-navy-500"
                                }`}
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </button>
                        <button
                            onClick={() => setActiveTab("newsletter")}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px ${activeTab === "newsletter"
                                ? "border-navy-800 text-navy-800"
                                : "border-transparent text-navy-500"
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Newsletter
                        </button>
                        <button
                            onClick={() => setActiveTab("email")}
                            className={`flex items-center gap-2 px-4 py-2 border-b-2 -mb-px ${activeTab === "email"
                                ? "border-navy-800 text-navy-800"
                                : "border-transparent text-navy-500"
                                }`}
                        >
                            <Mail className="w-4 h-4" />
                            Cold Email
                        </button>
                    </div>

                    {!result && !isGenerating && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-navy-400" />
                            </div>
                            <p className="text-navy-500">
                                Enter your story and generate content for all three platforms.
                            </p>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                            <p className="text-navy-600">Creating your content...</p>
                        </div>
                    )}

                    {result && (
                        <div>
                            {/* LinkedIn Tab */}
                            {activeTab === "linkedin" && (
                                <div className="space-y-4">
                                    <div className="bg-navy-50 p-4 rounded-lg">
                                        <pre className="whitespace-pre-wrap text-sm text-navy-700 font-sans">
                                            {formatLinkedInPost()}
                                        </pre>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(formatLinkedInPost())}
                                        className="btn btn-primary w-full"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy LinkedIn Post
                                    </button>
                                </div>
                            )}

                            {/* Newsletter Tab */}
                            {activeTab === "newsletter" && (
                                <div className="space-y-4">
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-navy-700 mb-2">Subject Lines:</p>
                                        <ul className="space-y-1">
                                            {result.newsletter.subjectLines.map((line, i) => (
                                                <li key={i} className="text-sm text-navy-600">• {line}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-navy-50 p-4 rounded-lg">
                                        <pre className="whitespace-pre-wrap text-sm text-navy-700 font-sans">
                                            {formatNewsletter()}
                                        </pre>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(formatNewsletter())}
                                        className="btn btn-primary w-full"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy Newsletter
                                    </button>
                                </div>
                            )}

                            {/* Email Tab */}
                            {activeTab === "email" && (
                                <div className="space-y-4">
                                    <div className="bg-navy-50 p-4 rounded-lg">
                                        <pre className="whitespace-pre-wrap text-sm text-navy-700 font-sans">
                                            {formatColdEmail()}
                                        </pre>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(formatColdEmail())}
                                        className="btn btn-primary w-full"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy Cold Email
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
