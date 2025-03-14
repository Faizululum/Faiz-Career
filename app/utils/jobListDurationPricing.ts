
interface iAppProps {
    days: number;
    price: number;
    description: string;
}

export const jobListDurationPricing: iAppProps[] = [
  {
    days: 30,
    price: 1000000,
    description: "Standard Job Listing",
  },
  {
    days: 60,
    price: 1700000,
    description: "Extended Visibility",
  },
  {
    days: 90,
    price: 2500000,
    description: "Ultimate Job Listing",
  }
];