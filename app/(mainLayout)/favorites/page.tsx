import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import EmptyState from "@/components/general/EmptyState";
import JobCard from "@/components/general/JobCard";

async function getFavorites(userId: string) {
    const data = await prisma.saveJobPost.findMany({
        where: {
            userId: userId,
        },
        select: {
            JobPost: {
                select: {
                    id: true,
                    jobTitle: true,
                    salaryFrom: true,
                    salaryTo: true,
                    createdAt: true,
                    employmentType: true,
                    location: true,
                    Company: {
                        select: {
                            name: true,
                            logo: true,
                            location: true,
                            about: true,
                        },
                    },
                },
            },
        },
    });

    return data;
}

const FavoritesPage = async () => {
    const session = await requireUser();
    const data = await getFavorites(session?.id as string);

    return (
        <div className="grid grid-cols-1 mt-5 gap-4">
        {data.length === 0 ? (
        <EmptyState
            title="You have no favorites jobs"
            description="You can favorite jobs by clicking the heart icon on the job listing page."
            buttonText="Find a Job"
            href="/"
        />
        ) : (
        data.map((favorite) => (
            <JobCard
                key={favorite.JobPost.id}
                job={favorite.JobPost}
            />
        ))
        )}
    </div>
  )
}

export default FavoritesPage