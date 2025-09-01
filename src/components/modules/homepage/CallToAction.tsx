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

export default function CallToAction({
  heading = "Ready to Ship Smarter?",
  description = "Experience fast, reliable, and affordable parcel delivery. Join thousands of businesses and individuals who trust us to deliver on time, every time.",
  buttons = {
    primary: {
      text: "Get Started",
      url: "/dashboard",
    },
    secondary: {
      text: "Learn More",
      url: "/about",
    },
  },
}: Cta10Props) {
  return (
    <section className="scale-x-[0.9] py-24">
      <div className="container">
        <div className="bg-primary text-white flex w-full flex-col gap-16 overflow-hidden rounded-lg p-8 md:rounded-xl lg:flex-row lg:items-center lg:p-12">
          <div className="flex-1">
            <h3 className="text-white  mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="text-muted-background max-w-xl lg:text-lg">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            
            {buttons.secondary && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="uppercase text-foreground"
              >
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
