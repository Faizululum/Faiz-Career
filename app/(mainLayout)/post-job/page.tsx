/* eslint-disable react/no-unescaped-entities */
import CreateJobForm from '@/components/forms/CreateJobForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo1 from "@/public/company-1.png";
import Logo2 from "@/public/company-2.jpg";
import Logo3 from "@/public/company-3.png";
import Logo4 from "@/public/company-4.jpg";
import Image from 'next/image';

const companies = [
    {id: 1, name: "Company 1", logo: Logo1},
    {id: 2, name: "Company 2", logo: Logo2},
    {id: 3, name: "Company 3", logo: Logo3},
    {id: 4, name: "Company 4", logo: Logo4},
    {id: 5, name: "Company 4", logo: Logo3},
    {id: 6, name: "Company 5", logo: Logo1},
];

const testimonials = [
    {
        author: "John Doe",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        company: "TechCorp",
    },
    {
        author: "Jane Doe",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        company: "TechCorp",
    },
    {
        author: "John Doe",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.",
        company: "TechCorp",
    },
]

const stats = [
    {id: 1, value: "10k+", label: "Monthly active job seekers"},
    {id: 2, value: "48h", label: "Average time to apply"},
    {id: 3, value: "95%", label: "Employee satisfaction"},
    {id: 4, value: "500+", label: "Company hiring remotely"},
]

const PostJobPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 mt-5">
        <Card className="col-span-1 md:col-span-2">
            <CreateJobForm />            
        </Card>

        <div className="col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Trusted by Industry Leaders</CardTitle>
                    <CardDescription>Join thousands of other job seekers who have posted jobs on Faiz Career.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Company Logos */}
                    <div className="grid grid-cols-3 gap-4">
                        {companies.map((company) => (
                            <div key={company.id}>
                                <Image src={company.logo} alt={company.name} width={100} height={100} className="rounded-lg opacity-75 transition-opacity hover:opacity-100" />
                            </div>   
                        ))}
                    </div>

                    <div className="space-y-2">
                        {testimonials.map((testimonial, index) => (
                            <blockquote key={index} className="border-l-2 border-primary pl-4">
                                <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
                                <footer className="text-sm font-medium mt-2">- {testimonial.author}, {testimonial.company}</footer>
                            </blockquote>
                        ))}
                    </div>

                    {/* Render stats here */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="rounded-lg bg-muted p-4">
                                <h4 className="text-2xl font-bold">{stat.value}</h4>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>      
    </div>
  )
}

export default PostJobPage