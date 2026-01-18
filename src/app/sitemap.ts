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
    ];

    const staticRoutes = staticPages.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    // Blog posts could be added dynamically here in the future
    // const blogPosts = await getBlogPosts();
    // const blogRoutes = blogPosts.map(post => ({
    //   url: `${baseUrl}/blog/${post.slug}`,
    //   lastModified: post.updatedAt,
    //   changeFrequency: "monthly" as const,
    //   priority: 0.6,
    // }));

    return [...staticRoutes];
}
