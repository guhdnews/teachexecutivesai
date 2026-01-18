"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/contexts";
import { toast } from "sonner";
import {
    Loader2,
    Upload,
    FileText,
    Sparkles,
    Download,
    Save,
    Target,
    ArrowRight,
    RefreshCw,
} from "lucide-react";
import Link from "next/link";

// Form schema
const nicheFormSchema = z.object({
    experience: z
        .string()
        .min(50, "Please provide at least 50 characters describing your experience")
        .max(5000, "Please keep your description under 5000 characters"),
});

type NicheFormData = z.infer<typeof nicheFormSchema>;

interface NicheResult {
    name: string;
    targetClient: string;
    problem: string;
    uniqueAngle: string;
    estimatedValue: string;
    firstStep: string;
}

interface NicheOutput {
    niches: NicheResult[];
    recommendation: string;
}

export function NicheArchitectContent() {
    const { hasTool, tier } = useUser();
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<NicheOutput | null>(null);
    const [selectedNiche, setSelectedNiche] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<NicheFormData>({
        resolver: zodResolver(nicheFormSchema),
    });

    const experienceValue = watch("experience", "");
    const charCount = experienceValue.length;

    // Check access
    if (!hasTool("niche")) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-navy-400" />
                </div>
                <h1 className="text-h1 text-navy-800 mb-4">Niche Architect</h1>
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

    const onSubmit = async (data: NicheFormData) => {
        try {
            setIsGenerating(true);
            setResult(null);
            setSelectedNiche(null);

            const response = await fetch("/api/ai/niche-architect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ experience: data.experience }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to generate niches");
            }

            const output = await response.json();
            setResult(output);
            toast.success("Your niches have been discovered!");
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

    const handleSave = async () => {
        if (!result || selectedNiche === null) {
            toast.error("Please select a niche to save");
            return;
        }

        try {
            const response = await fetch("/api/ai/save-asset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "niche",
                    title: result.niches[selectedNiche].name,
                    content: result.niches[selectedNiche],
                }),
            });

            if (!response.ok) throw new Error("Failed to save");
            toast.success("Niche saved to your dashboard!");
        } catch {
            toast.error("Failed to save. Please try again.");
        }
    };

    const handleExportPDF = async () => {
        if (!result) return;
        toast.info("PDF export coming soon!");
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                        <Target className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                        <h1 className="text-h1 text-navy-800">Niche Architect</h1>
                        <p className="text-navy-500">Find your profitable consulting niche</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="card">
                    <h2 className="text-h2 text-navy-800 mb-4">Your Experience</h2>
                    <p className="text-navy-600 mb-6">
                        Describe your professional background, skills, industries you&apos;ve
                        worked in, and any unique expertise. The more detail, the better results.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <textarea
                                {...register("experience")}
                                rows={10}
                                placeholder="Example: I spent 30 years in manufacturing operations, managing facilities with 500+ employees. I've implemented lean manufacturing, led digital transformation projects, and helped companies reduce waste by 40%. I've worked in automotive, aerospace, and consumer goods..."
                                className={`input resize-none ${errors.experience ? "input-error" : ""
                                    }`}
                                disabled={isGenerating}
                            />
                            <div className="flex justify-between mt-2">
                                {errors.experience ? (
                                    <p className="error-message">{errors.experience.message}</p>
                                ) : (
                                    <p className="text-sm text-navy-500">
                                        Minimum 50 characters
                                    </p>
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
                                    Discovering Your Niches...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Discover My Niches
                                </>
                            )}
                        </button>
                    </form>

                    {/* Tips */}
                    <div className="mt-6 p-4 bg-navy-50 rounded-lg">
                        <p className="text-sm font-semibold text-navy-700 mb-2">
                            💡 Tips for better results:
                        </p>
                        <ul className="text-sm text-navy-600 space-y-1">
                            <li>• Include specific industries and roles</li>
                            <li>• Mention certifications or unique training</li>
                            <li>• Describe problems you&apos;ve solved</li>
                            <li>• Note any teaching or mentoring experience</li>
                        </ul>
                    </div>
                </div>

                {/* Results */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-h2 text-navy-800">Your Niches</h2>
                        {result && (
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setSelectedNiche(null);
                                }}
                                className="text-sm text-navy-500 hover:text-navy-700 flex items-center gap-1"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Reset
                            </button>
                        )}
                    </div>

                    {!result && !isGenerating && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Sparkles className="w-8 h-8 text-navy-400" />
                            </div>
                            <p className="text-navy-500">
                                Enter your experience and click &quot;Discover My Niches&quot; to get
                                personalized recommendations.
                            </p>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-gold-500 animate-spin mx-auto mb-4" />
                            <p className="text-navy-600">
                                Analyzing your experience and finding profitable niches...
                            </p>
                            <p className="text-sm text-navy-400 mt-2">
                                This may take 15-30 seconds
                            </p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-4">
                            {result.niches.map((niche, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedNiche(index)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedNiche === index
                                        ? "border-gold-500 bg-gold-50"
                                        : "border-navy-200 hover:border-navy-300"
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="font-semibold text-navy-800 mb-1">
                                                {niche.name}
                                            </h3>
                                            <p className="text-sm text-navy-600 mb-2">
                                                <span className="font-medium">Target:</span>{" "}
                                                {niche.targetClient}
                                            </p>
                                            <p className="text-sm text-navy-600 mb-2">
                                                <span className="font-medium">Problem:</span>{" "}
                                                {niche.problem}
                                            </p>
                                            <p className="text-sm text-gold-600 font-medium">
                                                {niche.estimatedValue}
                                            </p>
                                        </div>
                                        <div
                                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedNiche === index
                                                ? "border-gold-500 bg-gold-500"
                                                : "border-navy-300"
                                                }`}
                                        >
                                            {selectedNiche === index && (
                                                <span className="text-white text-xs">✓</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Recommendation */}
                            <div className="p-4 bg-navy-50 rounded-lg mt-4">
                                <p className="text-sm font-semibold text-navy-700 mb-1">
                                    🎯 AI Recommendation:
                                </p>
                                <p className="text-sm text-navy-600">{result.recommendation}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleSave}
                                    disabled={selectedNiche === null}
                                    className="flex-1 btn btn-primary"
                                >
                                    <Save className="w-4 h-4" />
                                    Save Niche
                                </button>
                                <button
                                    onClick={handleExportPDF}
                                    className="flex-1 btn btn-secondary"
                                >
                                    <Download className="w-4 h-4" />
                                    Export PDF
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
