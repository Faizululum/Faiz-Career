/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { jobPostSchema } from "@/app/utils/zodSchemas";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { cityList } from "@/app/utils/citiesList";
import SalaryRangeSelector from "../general/SalaryRangeSelector";
import JobDescriptionEditor from "../richTextEditor.tsx/JobDescriptionEditor";
import BenefitsSelector from "../general/BenefitsSelector";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "../general/UploadThingReexported";
import { Button } from "../ui/button";

const CreateJobForm = () => {

  const form = useForm<z.infer<typeof jobPostSchema>>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      benefits: [],
      companyAbout: "",
      companyLogo: "",
      companyLocation: "",
      companyName: "",
      companyWebsite: "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      listingDuration: 7,
      location: "",
      salaryFrom: 0,
      salaryTo: 0,
    }
  })
  return (
    <Form {...form}>
      <form className="col-span-1 lg:col-span-2 flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector control={form.control} minSalary={1000000} maxSalary={50000000} step={100000} />
                </FormControl>
              </FormItem>
            </div>

            <FormField 
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField 
              control={form.control}
              name="benefits"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field as any} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
                control={form.control}
                name="companyName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField 
                control={form.control}
                name="companyWebsite"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Website" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            <FormField 
                control={form.control}
                name="companyLinkedin"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company Linkedin</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Linkedin" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField 
                control={form.control}
                name="companyAbout"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Say something about your company" {...field} className="min-h-[120px]" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image src={field.value} alt="company logo" width={100} height={100} className="rounded-lg" />
                          <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2" onClick={() => field.onChange("")}>
                            <XIcon className="size-4"/>
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader" 
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url)
                          }}
                          onUploadError={() => {
                            console.log("something went wrong")
                          }}
                          className="cursor-pointer ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}

export default CreateJobForm