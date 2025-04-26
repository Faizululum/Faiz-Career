
interface iAppProps {
    days: number;
    price: number;
    description: string;
}

export const jobListDurationPricing: iAppProps[] = [
  {
    days: 30,
    price: 100000,
    description: "Standard Job Listing",
  },
  {
    days: 60,
    price: 170000,
    description: "Extended Visibility",
  },
  {
    days: 90,
    price: 250000,
    description: "Ultimate Job Listing",
  }
];