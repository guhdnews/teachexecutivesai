import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://aicoursesforadults.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/dashboard/",
                    "/admin/",
                    "/checkout/",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
