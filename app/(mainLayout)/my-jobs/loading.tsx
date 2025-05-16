import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const LoadingMyJobs = () => {
  return (
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
                    {[...Array(10)].map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="size-10 rounded-lg" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[150px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[100px]" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-[120px]" />
                            </TableCell>
                            <TableCell className="text-center">
                                <Skeleton className="size-8 rounded-lg" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}

export default LoadingMyJobs