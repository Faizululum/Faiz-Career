import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companySchema } from '@/app/utils/zodSchemas';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cityList } from '@/app/utils/citiesList';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/components/general/UploadThingReexported';
import { createCompany } from '@/app/actions';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

const CompanyForm = () => {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: "",
            location: "",
            about: "",
            logo: "",
            website: "",
            linkedin: "",
        }
    })

    const [pending, setPending] = useState(false);

    async function onSubmit(data: z.infer<typeof companySchema>) {
      try {
        setPending(true);
        await createCompany(data);
      } catch (error) {
        if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
          console.log("Something went wrong");
        }
      } finally {
        setPending(false);
      }
    }

  return (
    <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField   
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField   
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Location</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Location</SelectLabel>
                        {cityList.map((city) => (
                          <SelectItem key={city.code} value={city.name}>
                            <span>{city.name}</span>
                            <span className="text-muted-foreground pl-2">{city.province}</span>
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourcompany.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField   
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Linkedin</FormLabel>
                  <FormControl>
                    <Input placeholder="Linkedin Profile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField   
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About Company</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your company..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
              control={form.control}
              name="logo"
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
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Submitting..." : "Continue"}
            </Button>
        </form>
    </Form>
  )
}

export default CompanyForm