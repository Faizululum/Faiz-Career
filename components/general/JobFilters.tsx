import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { cityList } from "@/app/utils/citiesList";

const jobTypes = ["full-time", "part-time", "remote", "freelance", "internship", "contract"];

export default function JobFilter() {
    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
                <Button variant="destructive" size="sm" className="h-8">
                    <span>Clear All</span>
                    <XIcon className="size-4" />
                </Button>
            </CardHeader>

            <Separator className="mb-4" />

            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Job Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                        {jobTypes.map((job, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Checkbox id={job} />
                                <Label className="text-sm font-medium" htmlFor={job}>{job}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Location</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="remote">Remote (On Demand)</SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                            <SelectLabel>On Site (Location)</SelectLabel>
                            {cityList.map((city) => (
                            <SelectItem key={city.code} value={city.name}>
                                <span>{city.name}</span>
                                <span className="pl-2 text-muted-foreground text-xs">{city.province} (On Site)</span>
                            </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>

        </Card>
    )
}