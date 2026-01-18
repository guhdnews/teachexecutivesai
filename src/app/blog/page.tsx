import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Blog for Adults 55+ | Tips, Guides & Insights",
    description:
        "Practical AI tips for adults over 55. Learn about ChatGPT, AI safety, starting a business, and how to use AI in everyday life.",
    keywords: [
        "AI blog for seniors",
        "ChatGPT tips",
        "AI safety seniors",
        "AI for older adults",
        "AI learning blog",
        "technology for seniors",
    ],
    openGraph: {
        title: "The AI Learning Blog",
        description:
            "Practical tips, guides, and insights to help adults navigate the AI revolution with confidence.",
        type: "website",
    },
};

// Blog posts data - in production, this would come from a CMS or Firestore
const blogPosts = [
    {
        slug: "is-ai-replacing-jobs-over-50",
        title: "Is AI Replacing Jobs for People Over 50? (The Truth)",
        excerpt: "The reality might surprise you. For experienced professionals, AI is creating more opportunities than it's eliminating.",
        date: "January 15, 2026",
        readTime: "6 min read",
        category: "Career",
    },
    {
        slug: "5-ways-retirees-using-chatgpt-make-money",
        title: "5 Ways Retirees Are Using ChatGPT to Make Money",
        excerpt: "From consulting to content creation, discover how people are turning their experience into income with AI assistance.",
        date: "January 10, 2026",
        readTime: "8 min read",
        category: "Income",
    },
    {
        slug: "executives-guide-to-ai",
        title: "The Executive's Guide to AI: What You're Missing",
        excerpt: "You've built a successful career, but AI might be the one thing standing between you and the next chapter.",
        date: "January 5, 2026",
        readTime: "7 min read",
        category: "Leadership",
    },
    {
        slug: "turn-40-years-experience-consulting-business",
        title: "How to Turn 40 Years of Experience Into a Consulting Business",
        excerpt: "Your decades of experience are more valuable than you think. Learn how to package them into a profitable consulting practice.",
        date: "December 28, 2025",
        readTime: "10 min read",
        category: "Business",
    },
    {
        slug: "ai-scams-targeting-seniors",
        title: "AI Scams Targeting Seniors: How to Protect Yourself",
        excerpt: "As AI gets more sophisticated, so do the scams. Learn the warning signs and how to stay safe.",
        date: "December 20, 2025",
        readTime: "5 min read",
        category: "Safety",
    },
    {
        slug: "why-career-experience-worth-more-than-you-think",
        title: "Why Your Career Experience is Worth More Than You Think",
        excerpt: "In a world obsessed with new technology, your experience and wisdom are becoming increasingly rare and valuable.",
        date: "December 15, 2025",
        readTime: "6 min read",
        category: "Mindset",
    },
];

const categoryColors: Record<string, string> = {
    Career: "bg-blue-100 text-blue-700",
    Income: "bg-green-100 text-green-700",
    Leadership: "bg-purple-100 text-purple-700",
    Business: "bg-gold-100 text-gold-700",
    Safety: "bg-red-100 text-red-700",
    Mindset: "bg-navy-100 text-navy-700",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="container py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                            <span className="text-gold-500 font-bold text-xl">A</span>
                        </div>
                        <span className="text-navy-800 font-semibold text-lg hidden sm:block">
                            AI Courses for Adults
                        </span>
                    </Link>
                    <nav className="flex items-center gap-6">
                        <Link href="/free" className="text-navy-600 hover:text-navy-800 font-medium">
                            Free Training
                        </Link>
                        <Link href="/login" className="text-navy-600 hover:text-navy-800 font-medium">
                            Log In
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="bg-navy-800 text-white py-16">
                <div className="container text-center">
                    <h1 className="text-display-md mb-4">The AI Learning Blog</h1>
                    <p className="text-xl text-navy-200 max-w-2xl mx-auto">
                        Practical tips, guides, and insights to help adults navigate the AI revolution
                        with confidence.
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <main className="container py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="card hover:shadow-lg transition-shadow">
                            <Link href={`/blog/${post.slug}`}>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${categoryColors[post.category]}`}>
                                        {post.category}
                                    </span>
                                    <span className="text-sm text-navy-400">{post.readTime}</span>
                                </div>
                                <h2 className="text-h4 text-navy-800 mb-2 hover:text-gold-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-navy-600 text-sm mb-4">{post.excerpt}</p>
                                <p className="text-xs text-navy-400">{post.date}</p>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Newsletter CTA */}
                <div className="mt-16 bg-gold-50 rounded-lg p-8 text-center">
                    <h2 className="text-h3 text-navy-800 mb-3">Get AI Tips in Your Inbox</h2>
                    <p className="text-navy-600 mb-6 max-w-xl mx-auto">
                        Join 2,500+ adults learning to use AI with our weekly newsletter.
                        No spam, just practical insights.
                    </p>
                    <Link href="/free" className="btn btn-primary">
                        Get Your Free AI Quickstart
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} AI Courses for Adults. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6 mt-4 text-sm text-navy-400">
                        <Link href="/terms" className="hover:text-white">Terms</Link>
                        <Link href="/privacy" className="hover:text-white">Privacy</Link>
                        <Link href="/refund" className="hover:text-white">Refund Policy</Link>
                        <Link href="/earnings-disclaimer" className="hover:text-white">Earnings Disclaimer</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
