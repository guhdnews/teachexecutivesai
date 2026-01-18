import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Blog posts content - in production, this would come from a CMS or markdown files
const blogContent: Record<string, { title: string; category: string; date: string; readTime: string; content: string }> = {
    "is-ai-replacing-jobs-over-50": {
        title: "Is AI Replacing Jobs for People Over 50? (The Truth)",
        category: "Career",
        date: "January 15, 2026",
        readTime: "6 min read",
        content: `
## The Surprising Reality

If you're over 50 and worried about AI taking your job, I have good news: the opposite is more likely true for experienced professionals.

### Why Experience Matters More Than Ever

While AI can process information quickly, it cannot replace:
- **Judgment** built over decades of real-world experience
- **Relationships** cultivated throughout your career
- **Industry knowledge** that only comes from living through changes
- **Emotional intelligence** essential for leadership

### The Real Opportunity

Companies are desperately seeking people who can bridge the gap between AI capabilities and business needs. This is where your experience becomes invaluable.

#### Three Ways Experienced Professionals Are Thriving:

1. **AI Consultants** - Helping companies implement AI responsibly
2. **AI Trainers** - Teaching others how to use AI effectively  
3. **AI Strategists** - Advising on AI adoption at the leadership level

### The Bottom Line

AI isn't replacing experienced professionals—it's creating new opportunities for those willing to learn. Your decades of experience are the foundation that makes you uniquely qualified to guide others through this transition.

Ready to learn how AI can enhance your career? [Start with our free AI Quickstart training](/free).
        `,
    },
    "5-ways-retirees-using-chatgpt-make-money": {
        title: "5 Ways Retirees Are Using ChatGPT to Make Money",
        category: "Income",
        date: "January 10, 2026",
        readTime: "8 min read",
        content: `
## Turning Experience Into Income

Retirement doesn't have to mean the end of earning. Many retirees are discovering that AI tools like ChatGPT can help them create new income streams.

### 1. Consulting in Your Former Industry

Your 30+ years in banking, healthcare, manufacturing, or any field is incredibly valuable. ChatGPT helps you:
- Create professional proposals in minutes
- Research industry trends quickly
- Prepare client presentations

**Typical earnings: $100-300/hour**

### 2. Online Content Creation

Turn your expertise into blog posts, courses, or ebooks:
- Use AI to outline and draft content
- Share knowledge you've accumulated over decades
- Build passive income streams

**Typical earnings: $500-5,000/month**

### 3. Resume and Career Coaching

Help younger professionals navigate career challenges:
- Use AI to create customized advice
- Review resumes and provide feedback
- Conduct mock interviews

**Typical earnings: $50-150/session**

### 4. Administrative Support Services

Many small businesses need experienced help:
- Email management and correspondence
- Calendar and travel coordination
- Research and report generation

**Typical earnings: $25-50/hour**

### 5. Tutoring and Mentoring

Share your knowledge with the next generation:
- Academic tutoring enhanced by AI
- Professional mentoring
- Skills training

**Typical earnings: $40-100/hour**

### Getting Started

The key is starting small and building from there. [Our AI Business Builder program](/launchpad) walks you through exactly how to get started.
        `,
    },
    "executives-guide-to-ai": {
        title: "The Executive's Guide to AI: What You're Missing",
        category: "Leadership",
        date: "January 5, 2026",
        readTime: "7 min read",
        content: `
## The Executive AI Blind Spot

As a seasoned executive, you've navigated countless business challenges. But AI might be the one area where your experience doesn't give you an automatic advantage.

### Why This Is Different

Unlike previous technology waves, AI affects every department simultaneously:
- Marketing is using AI for content and targeting
- Finance is using AI for analysis and forecasting
- Operations is using AI for optimization
- HR is using AI for recruiting and training

### The Three Things Every Executive Should Know

#### 1. AI Is a Tool, Not a Replacement

The best results come from AI + human expertise. Your judgment, relationships, and strategic thinking remain essential.

#### 2. Start With Your Team

Before implementing AI company-wide, understand how your key people can use it to be more effective. The insights from the front lines are invaluable.

#### 3. Security and Ethics Matter

AI introduces new risks around data privacy, bias, and misinformation. Leadership must set the tone for responsible use.

### Your Action Plan

1. Spend 30 minutes with ChatGPT yourself
2. Ask your team how they're using AI
3. Identify one process where AI could help
4. Start small and learn fast

[Get started with our Executive AI Quickstart →](/free)
        `,
    },
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = blogContent[slug];

    if (!post) {
        return { title: "Post Not Found" };
    }

    return {
        title: `${post.title} | AI Courses for Adults`,
        description: post.content.substring(0, 160).replace(/[#*]/g, ""),
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogContent[slug];

    if (!post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
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
                    <Link href="/blog" className="text-navy-600 hover:text-navy-800 font-medium">
                        ← Back to Blog
                    </Link>
                </div>
            </header>

            {/* Article */}
            <article className="container py-12">
                <div className="max-w-3xl mx-auto">
                    {/* Back link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to all articles
                    </Link>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-sm font-medium">
                            {post.category}
                        </span>
                        <span className="text-navy-500">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-display-sm text-navy-800 mb-4">{post.title}</h1>

                    {/* Date */}
                    <p className="text-navy-500 mb-8">{post.date}</p>

                    {/* Content */}
                    <div className="prose prose-navy prose-lg max-w-none">
                        {post.content.split("\n").map((line, i) => {
                            if (line.startsWith("## ")) {
                                return <h2 key={i} className="text-h2 text-navy-800 mt-8 mb-4">{line.replace("## ", "")}</h2>;
                            }
                            if (line.startsWith("### ")) {
                                return <h3 key={i} className="text-h3 text-navy-800 mt-6 mb-3">{line.replace("### ", "")}</h3>;
                            }
                            if (line.startsWith("#### ")) {
                                return <h4 key={i} className="text-h4 text-navy-800 mt-4 mb-2">{line.replace("#### ", "")}</h4>;
                            }
                            if (line.startsWith("- ")) {
                                return <li key={i} className="text-navy-600 ml-4">{line.replace("- ", "")}</li>;
                            }
                            if (line.startsWith("1. ") || line.startsWith("2. ") || line.startsWith("3. ")) {
                                return <li key={i} className="text-navy-600 ml-4 list-decimal">{line.substring(3)}</li>;
                            }
                            if (line.startsWith("**") && line.endsWith("**")) {
                                return <p key={i} className="font-semibold text-navy-700">{line.replace(/\*\*/g, "")}</p>;
                            }
                            if (line.trim() === "") return null;
                            return <p key={i} className="text-navy-600 mb-4">{line}</p>;
                        })}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 bg-gold-50 rounded-lg p-8 text-center">
                        <h3 className="text-h3 text-navy-800 mb-3">Ready to Get Started?</h3>
                        <p className="text-navy-600 mb-6">
                            Learn how to use AI confidently with our free AI Quickstart training.
                        </p>
                        <Link href="/free" className="btn btn-primary">
                            Get Your Free Training
                        </Link>
                    </div>
                </div>
            </article>

            {/* Footer */}
            <footer className="bg-navy-900 text-white py-8">
                <div className="container text-center">
                    <p className="text-navy-400 text-sm">
                        © {new Date().getFullYear()} AI Courses for Adults. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

// Generate static paths for blog posts
export async function generateStaticParams() {
    return Object.keys(blogContent).map((slug) => ({ slug }));
}
