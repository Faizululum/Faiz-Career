
interface iAppProps {
    days: number;
    price: number;
    description: string;
}

export const jobListDurationPricing: iAppProps[] = [
  {
    days: 30,
    price: 10000,
    description: "Standard Job Listing",
  },
  {
    days: 60,
    price: 15000,
    description: "Extended Visibility",
  },
  {
    days: 90,
    price: 20000,
    description: "Ultimate Job Listing",
  }
];