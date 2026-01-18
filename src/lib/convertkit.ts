/**
 * ConvertKit API Integration
 * For managing email subscribers and sequences
 */

const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_API_SECRET = process.env.CONVERTKIT_API_SECRET;
const CONVERTKIT_BASE_URL = "https://api.convertkit.com/v3";

interface SubscriberData {
    email: string;
    firstName?: string;
    tags?: number[];
    fields?: Record<string, string>;
}

interface ConvertKitResponse {
    subscription?: {
        id: number;
        state: string;
        subscriber: {
            id: number;
            email_address: string;
        };
    };
    error?: string;
}

/**
 * Add a subscriber to a ConvertKit form
 */
export async function addSubscriberToForm(
    formId: string,
    data: SubscriberData
): Promise<ConvertKitResponse> {
    if (!CONVERTKIT_API_KEY) {
        console.warn("ConvertKit API key not configured");
        return { error: "ConvertKit not configured" };
    }

    try {
        const response = await fetch(
            `${CONVERTKIT_BASE_URL}/forms/${formId}/subscribe`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    api_key: CONVERTKIT_API_KEY,
                    email: data.email,
                    first_name: data.firstName,
                    tags: data.tags,
                    fields: data.fields,
                }),
            }
        );

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("ConvertKit API error:", error);
        return { error: "Failed to subscribe" };
    }
}

/**
 * Tag a subscriber
 */
export async function tagSubscriber(
    email: string,
    tagId: number
): Promise<ConvertKitResponse> {
    if (!CONVERTKIT_API_KEY) {
        console.warn("ConvertKit API key not configured");
        return { error: "ConvertKit not configured" };
    }

    try {
        const response = await fetch(
            `${CONVERTKIT_BASE_URL}/tags/${tagId}/subscribe`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    api_key: CONVERTKIT_API_KEY,
                    email,
                }),
            }
        );

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("ConvertKit tag error:", error);
        return { error: "Failed to tag subscriber" };
    }
}

/**
 * Get subscriber by email
 */
export async function getSubscriber(email: string) {
    if (!CONVERTKIT_API_SECRET) {
        console.warn("ConvertKit API secret not configured");
        return null;
    }

    try {
        const response = await fetch(
            `${CONVERTKIT_BASE_URL}/subscribers?api_secret=${CONVERTKIT_API_SECRET}&email_address=${encodeURIComponent(email)}`
        );

        const result = await response.json();
        return result.subscribers?.[0] || null;
    } catch (error) {
        console.error("ConvertKit get subscriber error:", error);
        return null;
    }
}

// Form IDs - would be configured in environment variables
export const CONVERTKIT_FORMS = {
    leadMagnet: process.env.CONVERTKIT_FORM_LEAD_MAGNET || "",
    purchase: process.env.CONVERTKIT_FORM_PURCHASE || "",
};

// Tag IDs for segmentation
export const CONVERTKIT_TAGS = {
    freeDownload: 1,
    sopPurchase: 2,
    caioPurchase: 3,
    launchpadPurchase: 4,
};
