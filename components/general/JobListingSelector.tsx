import { ControllerRenderProps } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { jobListDurationPricing } from "@/app/utils/jobListDurationPricing";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

interface iAppProps {
  field: ControllerRenderProps;
}

const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(value);
}

const JobListingSelector = ({ field }: iAppProps) => {
  return (
    <RadioGroup
      value={field.value?.toString()}
      onValueChange={(value) => field.onChange(parseInt(value))}
    >
        <div className="flex flex-col gap-4">
            {jobListDurationPricing.map((duration) => (
                <div key={duration.days} className="relative">
                    <RadioGroupItem 
                        value={duration.days.toString()}
                        id={duration.days.toString()}
                        className="sr-only"
                    />
                    <Label htmlFor={duration.days.toString()} className="flex flex-col cursor-pointer">
                        <Card className={cn(
                            field.value === duration.days ? "border-primary bg-primary/10" : "hover:bg-secondary/50", "p-4 border-2 transition-all"
                        )}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-lg">{duration.days} Days</p>
                                    <p className="text-muted-foreground text-sm">{duration.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-xl">{formatRupiah(duration.price)}</p>
                                    <p className="text-muted-foreground text-sm">{formatRupiah(duration.price / duration.days)}/days</p>
                                </div>
                            </div>
                        </Card>
                    </Label>
                </div>
            ))}
        </div>
    </RadioGroup>
  );
};

export default JobListingSelector;
