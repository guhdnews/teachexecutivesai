import { CheckoutCancelContent } from "@/components/CheckoutCancelContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Payment Cancelled | AI for Boomers",
    description: "Your payment was cancelled.",
};

export default function CheckoutCancelPage() {
    return <CheckoutCancelContent />;
}
