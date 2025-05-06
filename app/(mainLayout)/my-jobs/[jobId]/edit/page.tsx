import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import EditJobForm from "@/components/forms/EditJobForm";
import { notFound } from "next/navigation";

async function getData(jobId: string, userId: string) {
    const data = await prisma.jobPost.findUnique({
        where: {
            id: jobId,
            Company: {
                userId: userId,
            },
        },
        select: {
            benefits: true,
            id: true,
            jobTitle: true,
            jobDescription: true,
            location: true,
            salaryFrom: true,
            salaryTo: true,
            employmentType: true,
            listingDuration: true,
            Company: {
                select: {
                    about: true,
                    logo: true,
                    location: true,
                    name: true,
                    website: true,
                    linkedin: true,
                }
            }
        },
    });

    if (!data) {
        return notFound();
    }

    return data;
}

type Params = Promise<{ jobId: string }>;

const EditJobPage = async ({params}: { params: Params }) => {
    const { jobId } = await params;
    const user = await requireUser();
    const data = await getData(jobId, user.id as string);

  return (
    <EditJobForm jobPost={data} />
  )
}

export default EditJobPage