import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://aicoursesforadults.com";

    // Static pages
    const staticPages = [
        "",
        "/free",
        "/certification",
        "/launchpad",
        "/sop",
        "/login",
        "/signup",
        "/terms",
        "/privacy",
        "/refund",
        "/earnings-disclaimer",
        "/blog",
    ];

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
    }));

    // Blog posts
    const blogPosts = [
        "is-ai-replacing-jobs-over-50",
        "5-ways-retirees-using-chatgpt-make-money",
        "executives-guide-to-ai",
        "turn-40-years-experience-consulting-business",
        "ai-scams-targeting-seniors",
        "why-career-experience-worth-more-than-you-think",
    ];

    const blogRoutes = blogPosts.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...blogRoutes];
}
