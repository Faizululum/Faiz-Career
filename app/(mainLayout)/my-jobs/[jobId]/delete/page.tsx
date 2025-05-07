import { deleteJobPost } from "@/app/actions"
import { requireUser } from "@/app/utils/requireUser"
import GeneralSubmitButton from "@/components/general/SubmitButton"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrashIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

type Params = Promise<{ jobId: string }>

const DeleteJob = async ({params}: {params: Params}) => {
    const {jobId} = await params;
    await requireUser();
  return (
    <div>
        <Card className="max-w-lg mx-auto mt-32">
            <CardHeader>
                <CardTitle>Are you sure you want to delete this job?</CardTitle>
                <CardDescription>
                    This action cannot be undone. This will permanently delete the job and all associated data from our servers.
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
                <Link href="/my-jobs" className={buttonVariants({variant: "secondary"})}>
                    <ArrowLeft />
                    Cancel
                </Link>
                <form action={async () => {
                    "use server";

                    await deleteJobPost(jobId);
                    return redirect("/my-jobs");
                }}>
                    <GeneralSubmitButton text="Delete Job" variant="destructive" icon={<TrashIcon />} />
                </form>
            </CardFooter>
        </Card>
    </div>
  )
}

export default DeleteJob