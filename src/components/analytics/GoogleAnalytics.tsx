import Script from "next/script";

interface GoogleAnalyticsProps {
    measurementId: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
    if (!measurementId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}');
                `}
            </Script>
        </>
    );
}

// Event tracking helper - use window.gtag directly
export function trackGAEvent(eventName: string, params?: object) {
    if (typeof window !== "undefined") {
        const w = window as Window & { gtag?: (...args: unknown[]) => void };
        if (w.gtag) {
            w.gtag("event", eventName, params);
        }
    }
}

// Standard e-commerce events
export const AnalyticsEvents = {
    pageView: (pagePath: string) => trackGAEvent("page_view", { page_path: pagePath }),
    lead: (source: string) => trackGAEvent("generate_lead", { source }),
    addToCart: (productId: string, value: number) =>
        trackGAEvent("add_to_cart", { item_id: productId, value }),
    beginCheckout: (value: number) =>
        trackGAEvent("begin_checkout", { value }),
    purchase: (transactionId: string, value: number) =>
        trackGAEvent("purchase", { transaction_id: transactionId, value }),
    signup: (method: string) =>
        trackGAEvent("sign_up", { method }),
};
