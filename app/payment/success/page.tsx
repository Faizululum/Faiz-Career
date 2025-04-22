import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function paymentSuccess() {
    return (
        <div className="w-full min-h-screen flex flex-1 justify-center items-center">
            <Card className="w-[400px]">
                <div className="p-6">
                    <div className="w-full flex justify-center items-center">
                    <Check className="size-12 bg-green-500/30 text-green-500 rounded-full p-2" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5 w-full">
                        <h2 className="font-semibold text-xl">Payment Successful</h2>
                        <p className="text-sm text-muted-foreground mt-2 tracking-tight text-balance">Congrats your payment was successful! Your job posting is now active.</p>
                        <Button asChild className="mt-5 w-full">
                            <Link href="/">Go back to Homepage</Link>
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}