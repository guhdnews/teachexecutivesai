import Script from "next/script";

interface MetaPixelProps {
    pixelId: string;
}

export function MetaPixel({ pixelId }: MetaPixelProps) {
    if (!pixelId) return null;

    return (
        <>
            <Script id="meta-pixel" strategy="afterInteractive">
                {`
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${pixelId}');
                    fbq('track', 'PageView');
                `}
            </Script>
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
}

// Event tracking helper - use window.fbq directly
export function trackFBEvent(eventName: string, params?: object) {
    if (typeof window !== "undefined") {
        const w = window as Window & { fbq?: (...args: unknown[]) => void };
        if (w.fbq) {
            w.fbq("track", eventName, params);
        }
    }
}

// Standard Meta Pixel events
export const MetaEvents = {
    lead: (contentName: string) =>
        trackFBEvent("Lead", { content_name: contentName }),
    addToCart: (contentId: string, value: number, currency = "USD") =>
        trackFBEvent("AddToCart", { content_id: contentId, value, currency }),
    initiateCheckout: (value: number, currency = "USD") =>
        trackFBEvent("InitiateCheckout", { value, currency }),
    purchase: (value: number, currency = "USD") =>
        trackFBEvent("Purchase", { value, currency }),
    completeRegistration: (method: string) =>
        trackFBEvent("CompleteRegistration", { content_name: method }),
    viewContent: (contentId: string, contentName: string) =>
        trackFBEvent("ViewContent", { content_id: contentId, content_name: contentName }),
};
