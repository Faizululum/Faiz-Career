import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();

    const headersList = await headers();

    const signature = headersList.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET as string
        )
    } catch {
        return new Response("Webhook Error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const customerId = session.customer;
        const jobId = session.metadata?.jobId;

        if (!jobId) {
            return new Response("Job Id not found", { status: 400 });
        }

        const company = await prisma.user.findUnique({
            where: {
                stripeCustomerId: customerId as string,
            },
            select: {
                company: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        if (!company) {
            return new Response("Company not found for user", { status: 400 });
        }

        await prisma.jobPost.update({
            where: {
                id: jobId,
                companyId: company?.company?.id as string,
            },
            data: {
                status: "ACTIVE",
            }
        })
    }

    return new Response(null, { status: 200 });
}