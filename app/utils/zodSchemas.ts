import { z } from "zod";

export const companySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    location: z.string().min(2, "Company location must be at least 2 characters"),
    about: z.string().min(10, "Please provide some information about your company"),
    logo: z.string().min(1, "Please upload your company logo"),
    website: z.string().optional(),
    linkedin: z.string().optional(),
});

export const jobSeekerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    about: z.string().min(10, "Please provide some information about yourself"),
    resume: z.string().min(1, "Please upload your resume")
});