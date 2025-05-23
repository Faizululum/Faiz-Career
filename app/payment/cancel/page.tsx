import { requireUser } from "@/app/utils/requireUser";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";

export default async function paymentCancelled() {
    await requireUser();

    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <Card className="w-[400px]">
                <div className="p-6">
                    <div className="w-full flex justify-center items-center">
                    <XIcon className="size-12 bg-red-500/30 text-red-500 rounded-full p-2" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="font-semibold text-xl">Payment Cancelled</h2>
                        <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">
                            Dont worry, you wont be charged. Please try again!
                        </p>
                        <Button asChild className="mt-5 w-full">
                            <Link href="/">Go back to Homepage</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}