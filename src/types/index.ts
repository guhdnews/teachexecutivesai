/**
 * Type definitions for AI Courses for Adults
 */

// User tiers
export type UserTier = "free" | "sop" | "caio" | "launchpad";

// User profile from Firestore
export interface UserProfile {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    tier: UserTier;
    stripeCustomerId?: string;
    referralCode: string;
    referredBy?: string;
    deletedAt?: Date;
}

// Course structure
export interface Course {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    tier: UserTier;
    modules: Module[];
}

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: string;
    title: string;
    duration: string;
    contentPath?: string;
}

// Course progress
export interface Progress {
    id: string; // format: {userId}_{courseId}
    userId: string;
    courseId: string;
    completedLessons: string[];
    currentLesson: string;
    percentComplete: number;
    lastAccessedAt: Date;
}

// AI tool generation
export type ToolType = "niche" | "authority" | "dealmaker";

export interface Generation {
    id: string;
    userId: string;
    toolType: ToolType;
    input: Record<string, unknown>;
    output: string;
    createdAt: Date;
    exported: boolean;
}

// Niche Architect output
export interface NicheResult {
    name: string;
    targetClient: string;
    problem: string;
    uniqueAngle: string;
    estimatedValue: string;
    firstStep: string;
}

export interface NicheArchitectOutput {
    niches: NicheResult[];
    recommendation: string;
}

// Authority Engine output
export interface AuthorityOutput {
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

// Deal Maker output
export interface DealMakerOutput {
    sow: {
        projectTitle: string;
        background: string;
        deliverables: string[];
        timeline: {
            phase: string;
            description: string;
            duration: string;
        }[];
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

// Saved assets
export interface SavedAsset {
    id: string;
    type: "niche" | "content" | "contract";
    title: string;
    content: string | NicheResult | AuthorityOutput | DealMakerOutput;
    createdAt: Date;
}

export interface UserAssets {
    niches: SavedAsset[];
    content: SavedAsset[];
    contracts: SavedAsset[];
}

// Referrals
export type ReferralStatus = "pending" | "paid";

export interface Referral {
    id: string;
    referrerId: string;
    referredUserId: string;
    referralCode: string;
    purchaseAmount: number;
    commission: number;
    status: ReferralStatus;
    createdAt: Date;
}

// Email subscriber
export interface EmailSubscriber {
    id: string;
    email: string;
    source: "lead_magnet" | "signup" | "checkout";
    segment: string[];
    convertKitId?: string;
    subscribedAt: Date;
}

// Testimonial
export interface Testimonial {
    id: string;
    name: string;
    age: number;
    title: string;
    company?: string;
    location: string;
    photoUrl: string;
    quote: string;
    outcome?: string;
    tier: UserTier;
    featured: boolean;
}

// API Response types
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    meta?: {
        page?: number;
        totalPages?: number;
        totalCount?: number;
    };
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: ErrorCode;
        message: string;
        field?: string;
    };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// Error codes
export type ErrorCode =
    | "AUTH_REQUIRED"
    | "AUTH_INVALID"
    | "AUTH_EXPIRED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "VALIDATION_ERROR"
    | "RATE_LIMITED"
    | "PAYMENT_REQUIRED"
    | "PAYMENT_FAILED"
    | "GENERATION_FAILED"
    | "GENERATION_TIMEOUT"
    | "UPLOAD_TOO_LARGE"
    | "UPLOAD_INVALID"
    | "SERVER_ERROR";

// Cart
export interface CartItem {
    productId: string;
    name: string;
    price: number;
    priceId: string;
}

export interface Cart {
    items: CartItem[];
    orderBump: boolean;
    subtotal: number;
    total: number;
}
