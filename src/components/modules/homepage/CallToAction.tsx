import { Button } from "@/components/ui/button";

interface Cta10Props {
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

export default function CallToAction ({
  heading = "Call to Action",
  description = "Deliver faster with our service of parcel delivery system. Speed up your business and ship products in record time.",
  buttons = {
    primary: {
      text: "Join Now",
      url: "/dashboard",
    },
  },
}: Cta10Props) {
  return (
    <section className="scale-x-[0.9] py-32">
      <div className="container">
        <div className="bg-accent flex w-full flex-col gap-16 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-muted-foreground max-w-xl lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {buttons.primary && (
              <Button asChild variant="default" size="lg" className="text-background dark:text-foreground">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

