import { CheckoutSuccessContent } from "@/components/CheckoutSuccessContent";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Payment Successful | AI Courses for Adults",
    description: "Thank you for your purchase! Your access has been activated.",
};

export default function CheckoutSuccessPage() {
    return <CheckoutSuccessContent />;
}
