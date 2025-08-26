import { ArrowRight, ChevronRight, ChevronUp } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const DottedDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("relative", className)}>
    <div className="-left-25 bg-muted absolute top-4 h-[1.5px] w-[115%]" />
    <div className="-left-25 bg-muted absolute bottom-4 h-[1.5px] w-[115%]" />
    <div className="-top-25 bg-muted absolute left-4 h-[130%] w-[1.5px]" />
    <div className="-top-25 bg-muted absolute right-4 h-[130%] w-[1.5px]" />
    <div className="bg-foreground absolute left-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute right-[12.5px] top-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] left-[12.5px] z-10 size-2 rounded-full" />
    <div className="bg-foreground absolute bottom-[12.5px] right-[12.5px] z-10 size-2 rounded-full" />
    {children}
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden lg:max-h-[85vh] bg-background mx-auto">
      <div className="px-0! container relative flex flex-col items-center lg:scale-y-[0.8] xl:scale-[0.8] origin-top">
        <DottedDiv>
          <div className="grid lg:grid-cols-2">
            {/* Left Content */}
            <div className="flex w-full flex-col gap-8 px-10 py-20">
              <Badge
                variant="outline"
                className="flex w-fit cursor-pointer items-center gap-4 rounded-full px-6 py-2 transition-all ease-in-out hover:gap-6"
                asChild
              >
                <Link to="/about" className="flex items-center">
                  <span className="text-muted-foreground text-sm font-medium tracking-tight">
                    About Us
                  </span>
                  <ChevronRight className="size-4!" />
                </Link>
              </Badge>

              <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
                Reach the world with
                <br />
                <span className="text-primary">PARCEL</span>
                GO.
              </h1>
              <p className="text-muted-foreground tracking-tight md:text-xl">
                Fast | Reliable | Global
              </p>

              <div className="flex w-full gap-2">
                <Button
                  asChild
                  id="register"
                  className="text-md bg-primary text-primary-foreground dark:text-foreground h-12 w-fit rounded-full px-6"
                >
                  <Link to="/register" className="flex items-center gap-2">
                    Register <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <DottedDiv className="group size-full place-self-end p-4 lg:w-4/6">
              <div className="bg-muted/50 group-hover:bg-muted relative h-full w-full p-6 transition-all ease-in-out">
                {/* Bg Image div */}
                <div className="relative h-full w-full overflow-hidden rounded-3xl">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-5oYbG-sEImY-unsplash.jpg"
                    alt="aiImage"
                    className="h-full w-full object-cover"
                  />
                  <div className="bg-linear-to-t absolute inset-0 from-black/70 to-transparent"></div>
                </div>

                <div className="absolute top-4 -ml-4 flex h-full w-full flex-col items-center justify-between p-10">
                  <p className="flex w-full items-center text-xl tracking-tighter text-background dark:text-foreground">
                    2025 <span className="bg-background dark:bg-foreground mx-2 h-2.5 w-[1px]" />
                    August
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-background dark:text-foreground text-center text-6xl font-semibold tracking-tight">
                      New <br />
                      Parcel
                    </h2>
                    <div className="bg-background dark:bg-foreground mt-2 h-1 w-6 rounded-full" />
                    <p className="80 mt-10 max-w-sm px-2 text-center text-lg font-light leading-5 tracking-tighter text-background dark:text-foreground">
                      Discover our worldwide parcel delivery service.
                    </p>
                  </div>
                  <Button asChild size={"lg"} className="text-background dark:text-foreground py-10">
                    <Link
                      to="/contact"
                      className="group mb-6 flex flex-col items-center"
                    >
                      <ChevronUp
                        size={30}
                        className="transition-all ease-in-out group-hover:-translate-y-2"
                      />
                      <p className="text-xl tracking-tight">
                        Reach Us
                      </p>
                    </Link>
                  </Button>
                </div>
              </div>
            </DottedDiv>
          </div>
        </DottedDiv>
      </div>
    </section>
  );
}
