import Link from "next/link";
import {
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
              <span className="text-gold-500 font-bold text-xl">E</span>
            </div>
            <span className="text-navy-800 font-semibold text-lg hidden sm:block">
              Executive AI Institute
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href="/free"
              className="text-navy-600 hover:text-navy-800 font-medium hidden sm:block"
            >
              Free Training
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-20 lg:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gold-400 font-semibold mb-4 text-lg">
              For Executives & Professionals 55+
            </p>
            <h1 className="text-display-lg mb-6">
              Turn 40 Years of Experience Into a Profitable
              <span className="text-gold-400"> AI-Powered</span> Consulting Business
            </h1>
            <p className="text-body-lg text-navy-200 mb-8 max-w-2xl mx-auto">
              You&apos;ve led teams, managed budgets, and navigated corporate politics.
              Now learn to use AI as your digital staff—no coding required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/free" className="btn btn-primary text-lg px-8 py-4">
                Start Your Free Training
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#how-it-works"
                className="btn btn-outline border-white text-white hover:bg-white/10 text-lg px-8 py-4"
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
            <span className="font-semibold">Join 1,000+ executives</span> who&apos;ve
            discovered how to leverage AI for their next chapter
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
              Most executives over 50 feel like they&apos;re being left behind in the AI revolution...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProblemCard
              emoji="😰"
              title="Worried About Relevance"
              description="You've heard AI is 'replacing jobs' and wonder if your decades of experience still matter."
            />
            <ProblemCard
              emoji="🤯"
              title="Overwhelmed by Tech"
              description="Every AI tool seems designed for 25-year-olds who grew up with smartphones in their hands."
            />
            <ProblemCard
              emoji="💭"
              title="Unclear Next Steps"
              description="Retirement is approaching (or here), but you're not ready to stop contributing—you just need a new vehicle."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="bg-navy-50 py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gold-600 font-semibold mb-2">The Solution</p>
            <h2 className="text-display-md text-navy-800 mb-4">
              AI Isn&apos;t Replacing You—It&apos;s Your New Staff
            </h2>
            <p className="text-body-lg text-navy-600">
              Think of AI as a team of tireless assistants who never call in sick,
              never need training twice, and work 24/7.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Target}
              title="Find Your Niche"
              description="Our AI tool analyzes your unique experience and identifies 3 profitable micro-niches where your expertise commands premium rates."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Build Authority"
              description="Create LinkedIn posts, newsletters, and cold emails that position you as the go-to expert—all with AI assistance."
            />
            <FeatureCard
              icon={BookOpen}
              title="Close Deals"
              description="Generate professional proposals and contracts in minutes, not hours. Look like a seasoned firm from day one."
            />
          </div>
        </div>
      </section>

      {/* Offer Stack */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gold-600 font-semibold mb-2">Your Learning Path</p>
            <h2 className="text-display-md text-navy-800 mb-4">
              Three Steps to AI Mastery
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <OfferCard
              step="1"
              title="Free: Digital Defense Briefing"
              price="$0"
              features={[
                "1-page AI security checklist",
                "Protect yourself from scams",
                "Instant PDF download",
              ]}
              ctaText="Get Free Access"
              ctaHref="/free"
              variant="free"
            />
            <OfferCard
              step="2"
              title="CAIO Certification"
              price="$197"
              features={[
                "11 comprehensive lessons",
                "Prompt engineering mastery",
                "Official CAIO certificate",
                "LinkedIn badge",
              ]}
              ctaText="Learn More"
              ctaHref="/certification"
              variant="popular"
            />
            <OfferCard
              step="3"
              title="Wisdom Consultant Launchpad"
              price="$497"
              features={[
                "Everything in CAIO",
                "3 AI-powered tools",
                "Business launch system",
                "Private community",
              ]}
              ctaText="Launch Your Business"
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
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TestimonialCard
              name="Robert M."
              age={62}
              title="Former VP of Operations"
              quote="I was skeptical about AI until I found this program. Now I have a thriving consulting practice helping manufacturing companies modernize."
            />
            <TestimonialCard
              name="Patricia K."
              age={58}
              title="Retired HR Director"
              quote="The Niche Architect tool helped me discover a specialty I never would have thought of. I landed my first $15K contract in month two."
            />
            <TestimonialCard
              name="James T."
              age={67}
              title="Former CFO"
              quote="Finally, an AI program that speaks my language. No jargon, no fluff—just practical tools that work."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-display-md text-navy-800 mb-4">
              Ready to Turn Your Experience Into Income?
            </h2>
            <p className="text-body-lg text-navy-600 mb-8">
              Start with our free Digital Defense Briefing and see how AI can work for you.
            </p>
            <Link href="/free" className="btn btn-primary text-lg px-8 py-4">
              Get Your Free Training
              <ArrowRight className="w-5 h-5" />
            </Link>
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
                  <span className="text-navy-900 font-bold text-xl">E</span>
                </div>
                <span className="font-semibold">Executive AI Institute</span>
              </div>
              <p className="text-navy-300 text-sm">
                Empowering executives to leverage AI for their next chapter.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/free" className="hover:text-white">Free Training</Link></li>
                <li><Link href="/sop" className="hover:text-white">AI SOPs</Link></li>
                <li><Link href="/certification" className="hover:text-white">CAIO Certification</Link></li>
                <li><Link href="/launchpad" className="hover:text-white">Launchpad</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/login" className="hover:text-white">Log In</Link></li>
                <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-navy-300 text-sm">
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
                <li><Link href="/earnings" className="hover:text-white">Earnings Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-navy-700 mt-8 pt-8 text-center text-navy-400 text-sm">
            © {new Date().getFullYear()} Executive AI Institute. All rights reserved.
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

// Component: Offer Card
function OfferCard({
  step,
  title,
  price,
  features,
  ctaText,
  ctaHref,
  variant,
}: {
  step: string;
  title: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  variant: "free" | "popular" | "premium";
}) {
  const isPremium = variant === "premium";
  const isPopular = variant === "popular";

  return (
    <div
      className={`card relative ${isPopular ? "border-gold-500 border-2 shadow-lg" : ""
        } ${isPremium ? "bg-navy-800 text-white" : ""}`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-900 text-sm font-semibold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="text-sm text-gold-600 font-semibold mb-2">Step {step}</div>
      <h3 className={`text-h3 mb-2 ${isPremium ? "text-white" : "text-navy-800"}`}>
        {title}
      </h3>
      <p className={`text-2xl font-bold mb-4 ${isPremium ? "text-gold-400" : "text-navy-900"}`}>
        {price}
      </p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle className={`w-5 h-5 flex-shrink-0 ${isPremium ? "text-gold-400" : "text-green-500"}`} />
            <span className={isPremium ? "text-navy-200" : "text-navy-600"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={`btn w-full ${isPremium
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
