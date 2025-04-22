"use server";

import { requireUser } from "./utils/requireUser";
import { z } from "zod";
import { companySchema, jobPostSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { stripe } from "./utils/stripe";
import { jobListDurationPricing } from "./utils/jobListDurationPricing";

const aj = arcjet
.withRule(
    shield({
        mode: "LIVE",
    })
)
.withRule(
    detectBot({
        mode: "LIVE",
        allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
    })
);
export async function createCompany(data: z.infer<typeof companySchema>) {
    const session = await requireUser();

    const req = await request()

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const validateData = companySchema.parse(data);

    await prisma.user.update({
        where: {
            id: session.id
        },
        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            company: {
                create: {
                    ...validateData,
                }
            }
        }
    });

    return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    const user = await requireUser();

    const req = await request()

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }
    
    const validateData = jobSeekerSchema.parse(data);

    await prisma.user.update({
        where: {
            id: user.id as string,
        },
        data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
                create: {
                    ...validateData,
                }
            }
        }
    });

    return redirect("/");
}

export async function createJob(data: z.infer<typeof jobPostSchema>) {
    const user = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const validateData = jobPostSchema.parse(data);

    const company = await prisma.company.findUnique({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            user: {
                select: {
                    stripeCustomerId: true,
                }
            }
        }
    })

    if (!company?.id) {
        return redirect("/");
    }

    let stripeCustomerId = company.user.stripeCustomerId;

    if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
            email: user.email as string,
            name: user.name as string,
        });

        stripeCustomerId = customer.id;

        // Update the user with the stripe customer id
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                stripeCustomerId: stripeCustomerId,
            }
        })
    }

    const jobpost = await prisma.jobPost.create({
        data: {
            jobDescription: validateData.jobDescription,
            jobTitle: validateData.jobTitle,
            employmentType: validateData.employmentType,
            location: validateData.location,
            salaryFrom: validateData.salaryFrom,
            salaryTo: validateData.salaryTo,
            benefits: validateData.benefits,
            listingDuration: validateData.listingDuration,
            companyId: company.id,
        },
        select: {
            id: true,
        }
    });

    const pricingTier = jobListDurationPricing.find(
        (tier) => tier.days === validateData.listingDuration
    );

    if (!pricingTier) {
        throw new Error("Invalid listing duration");
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
            {
                price_data: {
                    product_data: {
                        name: `Job Posting - ${pricingTier.days} Days`,
                        description: pricingTier.description,
                        images: [
                            "https://7i4l3odgnr.ufs.sh/f/E0kXuBVtaL9n4JRNwaSjOPnBhmVCM1pDXitFoagrLqIcfEJs",
                        ]
                    },
                    currency: "IDR",
                    unit_amount: pricingTier.price,
                },
                quantity: 1,
            },
        ],
        metadata: {
            jobId: jobpost.id,
        },
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    })

    return redirect(session.url as string);
}