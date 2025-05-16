import JobFilter from "@/components/general/JobFilters";
import JobListingLoading from "@/components/general/JobListingLoading";
import JobListings from "@/components/general/JobListings";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-cols-3 gap-8">
      <JobFilter />
      <div className="col-span-2 flex flex-col gap-6">
        <Suspense fallback={<JobListingLoading />}>
          <JobListings />
        </Suspense>
      </div>
    </div>
  );
}
