"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@/contexts";
import { toast } from "sonner";
import {
    Loader2,
    FileText,
    ArrowRight,
    Copy,
    RefreshCw,
    Download,
    Lock,
} from "lucide-react";
import Link from "next/link";

// Form schema
const dealFormSchema = z.object({
    clientName: z.string().min(2, "Please enter the client name"),
    clientCompany: z.string().min(2, "Please enter the company name"),
    problem: z.string().min(20, "Please describe the problem in more detail"),
    solution: z.string().min(20, "Please describe your solution"),
    price: z.string().min(1, "Please enter your price"),
    timeline: z.string().min(1, "Please enter the timeline"),
});

type DealFormData = z.infer<typeof dealFormSchema>;

interface DealOutput {
    sow: {
        projectTitle: string;
        background: string;
        deliverables: string[];
        timeline: { phase: string; description: string; duration: string }[];
        totalDuration: string;
        outOfScope: string[];
    };
    agreement: {
        servicesDescription: string;
        paymentTerms: string;
        confidentiality: boolean;
        terminationNotice: string;
    };
}

export function DealMakerContent() {
    const { hasTool } = useUser();
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<DealOutput | null>(null);
    const [activeTab, setActiveTab] = useState<"sow" | "agreement">("sow");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DealFormData>({
        resolver: zodResolver(dealFormSchema),
    });

    // Check access
    if (!hasTool("dealmaker")) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-navy-400" />
                </div>
                <h1 className="text-h1 text-navy-800 mb-4">Deal Maker</h1>
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

    const onSubmit = async (data: DealFormData) => {
        try {
            setIsGenerating(true);
            setResult(null);

            const response = await fetch("/api/ai/deal-maker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to generate documents");
            }

            const output = await response.json();
            setResult(output);
            toast.success("Your documents have been generated!");
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

    const copySOW = () => {
        if (!result) return;
        const { sow } = result;
        const text = `
STATEMENT OF WORK
${sow.projectTitle}

BACKGROUND
${sow.background}

DELIVERABLES
${sow.deliverables.map((d, i) => `${i + 1}. ${d}`).join("\n")}

TIMELINE
${sow.timeline.map((t) => `${t.phase}: ${t.description} (${t.duration})`).join("\n")}

Total Duration: ${sow.totalDuration}

OUT OF SCOPE
${sow.outOfScope.map((s) => `• ${s}`).join("\n")}
    `.trim();
        navigator.clipboard.writeText(text);
        toast.success("SOW copied to clipboard!");
    };

    const copyAgreement = () => {
        if (!result) return;
        const { agreement } = result;
        const text = `
CONSULTING AGREEMENT

SERVICES
${agreement.servicesDescription}

PAYMENT TERMS
${agreement.paymentTerms}

CONFIDENTIALITY
${agreement.confidentiality ? "Both parties agree to maintain confidentiality of all proprietary information." : "Standard terms apply."}

TERMINATION
Either party may terminate this agreement with ${agreement.terminationNotice} written notice.
    `.trim();
        navigator.clipboard.writeText(text);
        toast.success("Agreement copied to clipboard!");
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-h1 text-navy-800">Deal Maker</h1>
                        <p className="text-navy-500">Create proposals and contracts</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <div className="card">
                    <h2 className="text-h2 text-navy-800 mb-4">Project Details</h2>
                    <p className="text-navy-600 mb-6">
                        Enter the key details and we&apos;ll generate a professional Statement of
                        Work and Consulting Agreement.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Client Name</label>
                                <input
                                    {...register("clientName")}
                                    type="text"
                                    placeholder="John Smith"
                                    className={`input ${errors.clientName ? "input-error" : ""}`}
                                />
                                {errors.clientName && (
                                    <p className="error-message">{errors.clientName.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="label">Company</label>
                                <input
                                    {...register("clientCompany")}
                                    type="text"
                                    placeholder="Acme Corp"
                                    className={`input ${errors.clientCompany ? "input-error" : ""}`}
                                />
                                {errors.clientCompany && (
                                    <p className="error-message">{errors.clientCompany.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="label">Problem / Challenge</label>
                            <textarea
                                {...register("problem")}
                                rows={3}
                                placeholder="What problem does the client face?"
                                className={`input resize-none ${errors.problem ? "input-error" : ""}`}
                            />
                            {errors.problem && (
                                <p className="error-message">{errors.problem.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="label">Your Solution</label>
                            <textarea
                                {...register("solution")}
                                rows={3}
                                placeholder="What will you deliver to solve it?"
                                className={`input resize-none ${errors.solution ? "input-error" : ""}`}
                            />
                            {errors.solution && (
                                <p className="error-message">{errors.solution.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="label">Price</label>
                                <input
                                    {...register("price")}
                                    type="text"
                                    placeholder="$5,000"
                                    className={`input ${errors.price ? "input-error" : ""}`}
                                />
                                {errors.price && (
                                    <p className="error-message">{errors.price.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="label">Timeline</label>
                                <input
                                    {...register("timeline")}
                                    type="text"
                                    placeholder="4 weeks"
                                    className={`input ${errors.timeline ? "input-error" : ""}`}
                                />
                                {errors.timeline && (
                                    <p className="error-message">{errors.timeline.message}</p>
                                )}
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
                                    Generating Documents...
                                </>
                            ) : (
                                <>
                                    <FileText className="w-5 h-5" />
                                    Generate Documents
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-h2 text-navy-800">Documents</h2>
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
                            onClick={() => setActiveTab("sow")}
                            className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "sow"
                                ? "border-navy-800 text-navy-800"
                                : "border-transparent text-navy-500"
                                }`}
                        >
                            Statement of Work
                        </button>
                        <button
                            onClick={() => setActiveTab("agreement")}
                            className={`px-4 py-2 border-b-2 -mb-px ${activeTab === "agreement"
                                ? "border-navy-800 text-navy-800"
                                : "border-transparent text-navy-500"
                                }`}
                        >
                            Agreement
                        </button>
                    </div>

                    {!result && !isGenerating && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-navy-400" />
                            </div>
                            <p className="text-navy-500">
                                Enter project details to generate professional documents.
                            </p>
                        </div>
                    )}

                    {isGenerating && (
                        <div className="text-center py-12">
                            <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
                            <p className="text-navy-600">Creating your documents...</p>
                        </div>
                    )}

                    {result && (
                        <div>
                            {activeTab === "sow" && (
                                <div className="space-y-4">
                                    <div className="bg-navy-50 p-4 rounded-lg space-y-4">
                                        <div>
                                            <h3 className="font-semibold text-navy-800">
                                                {result.sow.projectTitle}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Background</p>
                                            <p className="text-sm text-navy-600">{result.sow.background}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Deliverables</p>
                                            <ul className="list-disc list-inside text-sm text-navy-600">
                                                {result.sow.deliverables.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Timeline</p>
                                            {result.sow.timeline.map((t, i) => (
                                                <p key={i} className="text-sm text-navy-600">
                                                    {t.phase}: {t.description} ({t.duration})
                                                </p>
                                            ))}
                                            <p className="text-sm text-navy-700 mt-2">
                                                Total: {result.sow.totalDuration}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={copySOW} className="btn btn-primary w-full">
                                        <Copy className="w-4 h-4" />
                                        Copy SOW
                                    </button>
                                </div>
                            )}

                            {activeTab === "agreement" && (
                                <div className="space-y-4">
                                    <div className="bg-navy-50 p-4 rounded-lg space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Services</p>
                                            <p className="text-sm text-navy-600">
                                                {result.agreement.servicesDescription}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Payment Terms</p>
                                            <p className="text-sm text-navy-600">
                                                {result.agreement.paymentTerms}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Confidentiality</p>
                                            <p className="text-sm text-navy-600">
                                                {result.agreement.confidentiality
                                                    ? "Both parties agree to maintain confidentiality."
                                                    : "Standard terms apply."}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy-700">Termination</p>
                                            <p className="text-sm text-navy-600">
                                                {result.agreement.terminationNotice} written notice
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={copyAgreement} className="btn btn-primary w-full">
                                        <Copy className="w-4 h-4" />
                                        Copy Agreement
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
