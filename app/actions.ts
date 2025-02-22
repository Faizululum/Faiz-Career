"use server";

import { requireUser } from "./utils/requireUser";
import { z } from "zod";
import { companySchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";

export async function createCompany(data: z.infer<typeof companySchema>) {
    const session = requireUser();

    const validateData = companySchema.parse(data);

    await prisma.user.update({
        where: {
            id: (await session).id
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

    redirect("/");
}