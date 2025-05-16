import JobFilter from "@/components/general/JobFilters";
import JobListingLoading from "@/components/general/JobListingLoading";
import JobListings from "@/components/general/JobListings";
import { Suspense } from "react";

type SearchParams = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>
}

export default async function Home({ searchParams }: SearchParams) {
  const params = await searchParams;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";

  const currentPage = Number(params.page) || 1;

  const filterKey = `page=${currentPage};jobTypes=${jobTypes.join(",")};location=${location}`;
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />} key={filterKey}>
          <JobListings currentPage={currentPage} jobTypes={jobTypes} location={location} />
        </Suspense>
      </div>
    </div>
  );
}
