import { saveJobPost, unSaveJobPost } from "@/app/actions";
import arcjet, { detectBot } from "@/app/utils/arcjet";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { benefits } from "@/app/utils/listOfBenefits";
import JsonToHtml from "@/components/general/JsonToHtml";
import { SaveJobButton } from "@/components/general/SubmitButton";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { request, tokenBucket } from "@arcjet/next";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"]
  })
);

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 30,
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "DRY_RUN",
        capacity: 100,
        interval: 60,
        refillRate: 10,
      })
    );
  }
}

async function getJob(jobId: string, userId?: string) {  
  const [jobData, savedJob] = await Promise.all([
    await prisma.jobPost.findUnique({
      where: {
        status: "ACTIVE",
        id: jobId,
      },
      select: {
        jobTitle: true,
        jobDescription: true,
        location: true,
        employmentType: true,
        benefits: true,
        createdAt: true,
        listingDuration: true,
        salaryFrom: true,
        salaryTo: true,
        Company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),

    userId ?
    await prisma.saveJobPost.findUnique({
      where: {
        userId_jobPostId: {
          userId: userId,
          jobPostId: jobId,
        }
      },
      select: {
        id: true,
      }
    })
    : null
  ])

  if (!jobData) {
    return notFound();
  }
  return {
    jobData,
    savedJob,
  };
}

type Params = Promise<{ jobId: string }>;

const JobIdPage = async ({ params }: { params: Params }) => {
  const { jobId } = await params;

  const session = await auth();

  const req = await request();
  
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("Access Denied");
  }

  const { jobData: data, savedJob } = await getJob(jobId, session?.user?.id);

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <Card className="p-6 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{data.jobTitle}</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="font-medium">{data.Company.name}</p>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full" variant="secondary">
                  {data.employmentType}
                </Badge>
                <span className="hidden md:inline text-muted-foreground">
                  *
                </span>
                <Badge className="rounded-full">{data.location}</Badge>
              </div>
            </div>
            
            {session?.user ? (
              <form action={
                savedJob ? unSaveJobPost.bind(null, savedJob.id) : saveJobPost.bind(null, jobId)
              }>
                <SaveJobButton savedJob={!!savedJob} />
              </form>
            ) : (
            <Link className={buttonVariants({variant: "outline"})} href={"/login"}>
              <Heart className="size-4" /> Save Job
            </Link>
            )}
          </div>

          <section>
            <h3 className="font-semibold">About this job</h3>
            <JsonToHtml json={JSON.parse(data.jobDescription)} />
          </section>

          <section>
            <h3 className="font-semibold mb-4">Benefits</h3>
            <div className="flex flex-wrap gap-3">
              {benefits.map((benefit) => {
                const isOffered = data.benefits.includes(benefit.id);
                return (
                  <Badge
                    className={cn(
                      isOffered ? "" : "opacity-75 cursor-not-allowed",
                      "rounded-full text-sm px-4 py-1.5"
                    )}
                    key={benefit.id}
                    variant={isOffered ? "default" : "outline"}
                  >
                    <span className="flex items-center gap-2">
                      {benefit.icon}{" "}
                      {benefit.label}
                    </span>
                  </Badge>
                );
              })}
            </div>
          </section>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Company Details Card */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src={data.Company.logo}
                alt={"Company Logo"}
                width={48}
                height={48}
                className="size-12 object-contain"
              />

              <div className="flex flex-col">
                <h3 className="font-semibold">{data.Company.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {data.Company.about}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Job Details Card */}
        <Card className="p-6">
          <div className="space-y-2">
            <div>
              <h3 className="font-semibold">Job Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Apply before
                </span>
                <span className="text-sm">
                  {new Date(
                    data.createdAt.getTime() +
                      data.listingDuration * 60 * 60 * 24 * 1000
                  ).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Posted On</span>
                <span className="text-sm">
                  {data.createdAt.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">
                  Employment Type
                </span>
                <span className="text-sm">{data.employmentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Location</span>
                <span className="text-sm">{data.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Salary</span>
                <span className="text-sm">{formatCurrency(data.salaryFrom)} - {formatCurrency(data.salaryTo)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Apply for this job</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Please let {data.Company.name} know that you are interested in
                this job on Faiz-Career. This help us grow!
              </p>
            </div>
            <Button className="w-full">Apply now!</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobIdPage;