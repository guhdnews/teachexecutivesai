import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
  Heart,
  Lightbulb,
  Menu,
  Briefcase,
  DollarSign,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="AI Courses for Adults"
              width={200}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/free"
              className="text-navy-600 hover:text-navy-800 font-medium"
            >
              Free Training
            </Link>
            <Link
              href="/certification"
              className="text-navy-600 hover:text-navy-800 font-medium"
            >
              Courses
            </Link>
            <Link
              href="/blog"
              className="text-navy-600 hover:text-navy-800 font-medium"
            >
              Blog
            </Link>
            <Link
              href="/login"
              className="text-navy-600 hover:text-navy-800 font-medium"
            >
              Log In
            </Link>
            <Link href="/free" className="btn btn-primary">
              Get Started
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/login" className="text-navy-600 font-medium">
              Log In
            </Link>
            <Link href="/free" className="btn btn-primary text-sm px-4 py-2">
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20 lg:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold mb-4 text-lg">
              AI Made Simple for Adults 55+
            </p>
            <h1 className="text-display-lg mb-6">
              Turn Your Life Experience Into a
              <span className="text-gold-400"> Profitable AI Business</span>
            </h1>
            <p className="text-body-lg text-navy-200 mb-8 max-w-2xl mx-auto">
              Learn AI the right way AND discover how to start your own AI consulting business.
              Your decades of experience + our AI training = a powerful combination that
              today&apos;s market desperately needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free" className="btn btn-primary text-lg px-8 py-4">
                Start Your Free Training
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="btn border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900 text-lg px-8 py-4"
              >
                How It Works
              </Link>
            </div>
            <p className="text-sm text-navy-300 mt-6">
              ✓ No credit card required ✓ Instant access ✓ Free security checklist
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-navy-50 py-6 border-b">
        <div className="container">
          <p className="text-center text-navy-600">
            <span className="font-semibold">Join thousands of adults</span> who&apos;ve
            discovered how to use AI confidently and safely
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-display-md text-navy-800 mb-4">
              Does This Sound Familiar?
            </h2>
            <p className="text-body-lg text-navy-600">
              You have decades of valuable experience, but feel stuck watching others profit from AI...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProblemCard
              emoji="😰"
              title="Overwhelmed by Technology"
              description="Everyone talks about AI, but nobody explains how YOU can actually make money with it — using the skills you already have."
            />
            <ProblemCard
              emoji="💰"
              title="Missing Out on Income"
              description="You see younger people starting AI businesses, but you're not sure how to turn your 30+ years of experience into a real income stream."
            />
            <ProblemCard
              emoji="⏰"
              title="Running Out of Time"
              description="Every month you wait, more people are getting ahead. You need a clear, step-by-step path — not more confusing tech talk."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="bg-navy-50 py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gold-600 font-semibold mb-2">Your Path to Profit</p>
            <h2 className="text-display-md text-navy-800 mb-4">
              From "What is AI?" to Your Own Business
            </h2>
            <p className="text-body-lg text-navy-600">
              We teach you AI AND show you exactly how to turn your experience into income.
              No tech background required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Lightbulb}
              title="1. Master the Basics"
              description="Learn AI fundamentals in plain English. No jargon, no confusion — just practical skills you can use immediately."
            />
            <FeatureCard
              icon={Briefcase}
              title="2. Find Your Niche"
              description="Discover which industries desperately need YOUR experience. We'll help you find the perfect fit for your background."
            />
            <FeatureCard
              icon={DollarSign}
              title="3. Start Earning"
              description="Get your first paying clients using our proven templates, tools, and community support. Many earn within 30 days."
            />
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-display-md text-navy-800 mb-4">
              What Will You Use AI For?
            </h2>
            <p className="text-body-lg text-navy-600">
              Start with personal tasks, then scale to a real business
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <UseCaseCard emoji="✍️" title="Write proposals & emails for clients" />
            <UseCaseCard emoji="🔍" title="Research industries in minutes" />
            <UseCaseCard emoji="📊" title="Create reports & presentations" />
            <UseCaseCard emoji="💡" title="Generate business ideas for your niche" />
            <UseCaseCard emoji="📝" title="Summarize contracts & documents" />
            <UseCaseCard emoji="🎯" title="Find and qualify potential clients" />
            <UseCaseCard emoji="📞" title="Prepare for sales conversations" />
            <UseCaseCard emoji="💵" title="Price your services confidently" />
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="bg-navy-50 py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gold-600 font-semibold mb-2">Your Path to AI Mastery & Business Success</p>
            <h2 className="text-display-md text-navy-800 mb-4">
              From Beginner to Business Owner
            </h2>
            <p className="text-body-lg text-navy-600">
              Start free, learn the essentials, then build your own AI consulting business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <OfferCard
              step="1"
              title="AI Quickstart"
              price="FREE"
              features={[
                "AI security checklist",
                "Protect yourself from scams",
                "Instant access",
              ]}
              ctaText="Get Free Access"
              ctaHref="/free"
              variant="free"
            />
            <OfferCard
              step="2"
              title="AI Essentials Bundle"
              price="$197"
              features={[
                "11 comprehensive lessons",
                "Use ChatGPT like a pro",
                "Certificate of completion",
                "Lifetime access",
              ]}
              ctaText="Get the Bundle"
              ctaHref="/certification"
              variant="popular"
            />
            <OfferCard
              step="3"
              title="AI Business Builder"
              price="$497"
              highlight="START YOUR BUSINESS"
              features={[
                "Everything in Essentials",
                "3 AI business tools included",
                "Find your profitable niche",
                "Generate clients & proposals",
                "1-on-1 support + community",
              ]}
              ctaText="Build Your Business"
              ctaHref="/launchpad"
              variant="premium"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-800 text-white py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-display-md mb-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard
              name="Robert M."
              age={68}
              title="Retired Teacher → AI Consultant"
              quote="I never thought I'd start a business at 68, but now I help local businesses use AI. Made $3,400 in my first month!"
            />
            <TestimonialCard
              name="Patricia K."
              age={62}
              title="Former HR Director"
              quote="The business tools are incredible. I found my niche in helping HR departments with AI — something I know inside out."
            />
            <TestimonialCard
              name="James T."
              age={71}
              title="Retired Engineer → Tech Advisor"
              quote="At 71, I'm now the AI expert my former colleagues call for advice. My engineering background plus AI training = perfect combo."
            />
          </div>
        </div>
      </section>

      {/* Stats / Why Choose Us */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-navy-50 to-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-display-md text-navy-800 mb-4">
              Why Adults Trust Us
            </h2>
            <p className="text-body-lg text-navy-600">
              We&apos;re not just another tech company. We understand your generation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">2,500+</p>
              <p className="text-navy-600">Adults Trained</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">98%</p>
              <p className="text-navy-600">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">150+</p>
              <p className="text-navy-600">Businesses Started</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold-500 mb-2">30 Days</p>
              <p className="text-navy-600">Money-Back Guarantee</p>
            </div>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-navy-600 italic">
              &ldquo;We designed this program specifically for adults who feel left behind
              by technology. No jargon, no rushing, just clear guidance at your pace.&rdquo;
            </p>
            <p className="text-navy-800 font-semibold mt-3">
              — The AI Courses for Adults Team
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display-md text-navy-800 mb-4">
                Common Questions
              </h2>
              <p className="text-body-lg text-navy-600">
                Honest answers to what people ask before signing up
              </p>
            </div>

            <div className="space-y-4">
              <FAQItem
                question="I'm not tech-savvy at all. Can I really learn this?"
                answer="Absolutely. We designed this specifically for people who feel intimidated by technology. Our lessons assume zero prior knowledge, use plain English, and go at your pace. If you can send an email, you can learn AI with us."
              />
              <FAQItem
                question="Is AI safe? I've heard about scams and privacy issues."
                answer="Great question — and exactly why we include a comprehensive AI Security Checklist in our free training. We teach you how to use AI safely, protect your personal information, and spot common scams. Safety is always our first priority."
              />
              <FAQItem
                question="How is this different from just watching YouTube videos?"
                answer="YouTube is overwhelming and scattered. Our program is structured, sequential, and designed for adult learners. Plus, you get worksheets, real exercises, and a clear path from beginner to confident user. No more random videos that leave you more confused."
              />
              <FAQItem
                question="What if I need help or get stuck?"
                answer="We've got you covered. Every lesson includes clear examples, and our help desk responds to questions personally — not with AI bots. You're never left figuring things out alone."
              />
              <FAQItem
                question="Can I really start a business using AI at my age?"
                answer="Age is actually your advantage. Companies desperately need experienced professionals who understand business AND can use AI. Your 30+ years of industry knowledge combined with AI skills is a rare and valuable combination. Many of our graduates are consulting within weeks of completing the program."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 gradient-warm">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="divider-gold mx-auto mb-6" />
            <h2 className="text-display-md text-navy-800 mb-4">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-body-lg text-navy-600 mb-8">
              Begin with our free AI Quickstart training and take the first step today.
            </p>
            <Link href="/free" className="btn btn-primary text-lg px-8 py-4">
              Get Your Free Training
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-navy-500 mt-4">
              No credit card required • Instant access • Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <span className="text-navy-900 font-bold text-xl">A</span>
                </div>
                <span className="font-semibold">AI Courses for Adults</span>
              </div>
              <p className="text-navy-300 text-sm">
                Making AI accessible for adults 55 and older.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/free" className="hover:text-white">Free Training</Link></li>
                <li><Link href="/certification" className="hover:text-white">AI Essentials</Link></li>
                <li><Link href="/launchpad" className="hover:text-white">Complete Mastery</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/login" className="hover:text-white">Log In</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">My Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-400 text-sm">
            © {new Date().getFullYear()} AI Courses for Adults. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: Problem Card
function ProblemCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card text-center">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-h3 text-navy-800 mb-2">{title}</h3>
      <p className="text-navy-600">{description}</p>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="card">
      <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-gold-600" />
      </div>
      <h3 className="text-h3 text-navy-800 mb-2">{title}</h3>
      <p className="text-navy-600">{description}</p>
    </div>
  );
}

// Component: Use Case Card
function UseCaseCard({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-navy-100 text-center">
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="text-navy-700 font-medium text-sm">{title}</p>
    </div>
  );
}

// Component: Offer Card
function OfferCard({
  step,
  title,
  price,
  features,
  ctaText,
  ctaHref,
  variant,
  highlight,
}: {
  step: string;
  title: string;
  price: string;
  features: string[];
  highlight?: string;
  ctaText: string;
  ctaHref: string;
  variant: "free" | "popular" | "premium";
}) {
  const isPremium = variant === "premium";
  const isPopular = variant === "popular";

  return (
    <div
      className={`card relative flex flex-col h-full ${isPopular ? "border-gold-500 border-2 shadow-lg" : ""
        } ${isPremium ? "bg-navy-800 text-white" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-900 text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      {isPremium && highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
          {highlight}
        </div>
      )}
      <div className="text-sm text-gold-600 font-semibold mb-2">Step {step}</div>
      <h3 className={`text-h3 mb-2 ${isPremium ? "text-white" : "text-navy-800"}`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold mb-4 ${isPremium ? "text-gold-400" : "text-navy-900"}`}>
        {price}
      </p>
      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isPremium ? "text-gold-400" : "text-green-500"}`} />
            <span className={isPremium ? "text-white" : "text-navy-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`btn w-full mt-auto ${isPremium
          ? "bg-gold-500 text-navy-900 hover:bg-gold-400"
          : variant === "free"
            ? "btn-outline"
            : "btn-primary"
          }`}
      >
        {ctaText}
      </Link>
    </div>
  );
}

// Component: Testimonial Card
function TestimonialCard({
  name,
  age,
  title,
  quote,
}: {
  name: string;
  age: number;
  title: string;
  quote: string;
}) {
  return (
    <div className="bg-navy-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-navy-600 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-navy-400" />
        </div>
        <div>
          <p className="font-semibold">{name}, {age}</p>
          <p className="text-sm text-navy-300">{title}</p>
        </div>
      </div>
      <p className="text-navy-200 italic">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

// Component: FAQ Item
function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="border border-navy-200 rounded-lg p-6 hover:border-gold-300 transition-colors">
      <h3 className="text-h4 text-navy-800 mb-3 flex items-start gap-2">
        <span className="text-gold-500 font-bold">Q:</span>
        {question}
      </h3>
      <p className="text-navy-600 pl-6">
        <span className="text-gold-600 font-semibold">A:</span> {answer}
      </p>
    </div>
  );
}

