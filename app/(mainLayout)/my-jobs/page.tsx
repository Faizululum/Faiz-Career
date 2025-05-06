import { prisma } from "@/app/utils/db"
import { requireUser } from "@/app/utils/requireUser";
import CopyLinkMenuItem from "@/components/general/CopyLink";
import EmptyState from "@/components/general/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CopyCheckIcon, MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getJobs(userId: string) {
    const data = await prisma.jobPost.findMany({
        where: {
            Company: {
                userId: userId,
            },
        },
        select: {
            id: true,
            jobTitle: true,
            status: true,
            createdAt: true,
            Company: {
                select: {
                    name: true,
                    logo: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}

const MyJobsPage = async () => {
    const session = await requireUser();
    const data = await getJobs(session?.id as string);
  return (
    <>
      {data.length === 0 ? (
        <EmptyState
            title="You have no jobs"
            description="You can create a job by clicking the button on the top right corner."
            buttonText="Create a Job now!"
            href="/post-job"
        />
      ) : (
        <Card>
            <CardHeader>
                <CardTitle>My Jobs</CardTitle>
                <CardDescription>
                    Manage your job listings and applications here.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((listing) => (
                            <TableRow key={listing.id}>
                                <TableCell>
                                    <Image 
                                        src={listing.Company.logo}
                                        alt="company logo"
                                        width={40}
                                        height={40}
                                        className="object-contain rounded-md size-10"
                                    />
                                </TableCell>
                                <TableCell>
                                    {listing.Company.name}
                                </TableCell>
                                <TableCell>
                                    {listing.jobTitle}
                                </TableCell>
                                <TableCell>
                                    {listing.status.charAt(0).toUpperCase() + listing.status.slice(1).toLowerCase()}
                                </TableCell>
                                <TableCell>
                                    {listing.createdAt.toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/my-jobs/${listing.id}/edit`}>
                                                    <PenBoxIcon />
                                                    Edit Job
                                                </Link>
                                            </DropdownMenuItem>
                                            <CopyLinkMenuItem jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${listing.id}`} />
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href={`/my-jobs/${listing.id}/delete`}>
                                                    <XCircle />
                                                    Delete Job
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      )}
    </>
  )
}

export default MyJobsPage