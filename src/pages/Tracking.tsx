/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router";
import { useTrackParcelQuery } from "@/redux/features/parcels/parcel.api";
import { Stepper, StepperDescription, StepperIndicator, StepperItem, StepperSeparator, StepperTitle } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SkeletonCard } from "@/utils/SkeletonCard";

export default function Tracking() {
const { trackingId } = useParams<{ trackingId: string }>();
const navigate = useNavigate();


const { data, isLoading } = useTrackParcelQuery({ id: trackingId });


  //console.log(data);

  //const parcel = data?.data;

  if (isLoading) return <SkeletonCard/>;
  if (!data || data.length === 0) return <div>
      <p>No tracking information found.</p>;
      <Button variant="default" className="flex items-center gap-2 dark:text-foreground hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
      </Button>
    </div>

  const steps = data.map((event: any, index: number) => ({
    step: index + 1,
    title: event.status,
    description: event.note,
    time: new Date(event.createdAt).toLocaleString(),
    updatedByRole: event.updatedByRole ?? '',
    location: event.location ?? "",
  }));

  return (
    <div className="w-[95%] max-w-2xl mx-auto my-10 space-y-8">
      <h1 className="text-2xl font-semibold text-center">
        Tracking History for {data.trackingId}
      </h1>

      <Stepper defaultValue={steps.length + 1} orientation="vertical" className="ml-10 lg:ml-0">
        {steps.map(({ step, title, description, location, updatedByRole, time }: any) => (
          <StepperItem key={step} step={step} className="relative items-start not-last:flex-1">
            <div className="flex items-start pb-12 last:pb-0">
              <StepperIndicator />
              <div className="mt-0.5 space-y-0.5 px-2 text-left">
                <StepperTitle>{title}</StepperTitle>
                {description && <StepperDescription>{description}</StepperDescription>}
                <StepperDescription>{time}</StepperDescription>
                {location && <StepperDescription>{location}</StepperDescription>}
                {updatedByRole && <StepperDescription> <span className="font-bold">Updated By: </span>{updatedByRole}</StepperDescription>}
                
              </div>
            </div>

            {step < steps.length && (
              <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
            )}
          </StepperItem>
        ))}
      </Stepper>

      <div className="flex justify-end">
        <Button variant="default" className="flex items-center gap-2 dark:text-foreground hover:bg-blue-600 dark:hover:bg-blue-700" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>
    </div>
  );
}
