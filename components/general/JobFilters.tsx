"use client";

import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { cityList } from "@/app/utils/citiesList";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const jobTypes = ["full-time", "part-time", "freelance", "internship", "contract"];

export default function JobFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get Current Filters from URL
    const currentJobTypes = searchParams.get("jobTypes")?.split(",") ?? [];
    const currentLocation = searchParams.get("location") || "";

    function clearAllFilters() {
        router.push("/");
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }

            return params.toString();
        },
        [searchParams]
    )
    
    function handleJobTypeChange(jobTypes: string, checked: boolean) {
        const current = new Set(currentJobTypes);
        
        if (checked) {
            current.add(jobTypes);
        } else {
            current.delete(jobTypes);
        }

        const newValue = Array.from(current).join(",");

        router.push(`?${createQueryString("jobTypes", newValue)}`);
    }

    function handleLocationChange(location: string) {
        router.push(`?${createQueryString("location", location)}`);
    }

    return (
        <Card className="col-span-1 h-fit">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-2xl font-semibold">Filters</CardTitle>
                <Button onClick={clearAllFilters} variant="destructive" size="sm" className="h-8">
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
                                <Checkbox onCheckedChange={(checked) => handleJobTypeChange(job, checked as boolean)} id={job} checked={currentJobTypes.includes(job)} />
                                <Label className="text-sm font-medium" htmlFor={job}>{job}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <Label className="text-lg font-semibold">Location</Label>
                    <Select value={currentLocation} onValueChange={(location) => {
                        handleLocationChange(location);
                    }}>
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