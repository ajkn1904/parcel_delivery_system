import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature17Props {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

export default function Features({
  heading = "Why Choose Us",
  subheading = "Core Features",
  features = [
    {
      title: "Fast Delivery",
      description:
        "We ensure your packages reach their destination quickly and safely, using optimized routes for maximum efficiency.",
      icon: <Timer className="size-4 md:size-6" />,
    },
    {
      title: "Innovative Tracking",
      description:
        "Stay updated with real-time tracking and notifications for every step of your parcel’s journey.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      title: "Reliable Service",
      description:
        "Our delivery network is dependable, ensuring your parcels arrive on time, every time.",
      icon: <ZoomIn className="size-4 md:size-6" />,
    },
    {
      title: "Wide Accessibility",
      description:
        "We provide convenient delivery options across multiple regions, making parcel shipping easy for everyone.",
      icon: <PersonStanding className="size-4 md:size-6" />,
    },
    {
      title: "Affordable Rates",
      description:
        "Our competitive pricing ensures you get premium delivery services without breaking the budget.",
      icon: <DollarSign className="size-4 md:size-6" />,
    },
    {
      title: "Customer Support",
      description:
        "Our friendly support team is available to help you with tracking, queries, and any delivery concerns.",
      icon: <MessagesSquare className="size-4 md:size-6" />,
    },
  ],
}: Feature17Props) {
  return (
    <section className="container py-24 scale-x-[0.90]">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-10 uppercase">{heading}</h1>
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">
          {subheading}
        </p>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-primary font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
