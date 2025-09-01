/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateParcelByAdminMutation } from "@/redux/features/parcels/parcel.api";
import { Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ParcelModal({ parcelData, activeRow, hoveredRow }: { parcelData: any, activeRow: any, hoveredRow: any }) {
  //console.log(parcelData);

  const [open, setOpen] = useState(false);
  const [parcelStatusUpdate] = useUpdateParcelByAdminMutation();

  const form = useForm({
    defaultValues: {
      currentStatus: "",
      note: "",
      location: "",
    },
  });

  // 🔹 Reset form values whenever modal opens with fresh data
  useEffect(() => {
    if (open && parcelData) {
      const lastLog = parcelData?.trackingEvents?.[parcelData?.trackingEvents.length - 1] || {};

      form.reset({
        currentStatus: parcelData?.currentStatus || "",
        note: lastLog.note || "",
        location: lastLog.location || "",
      });
    }
  }, [open, parcelData, form]);

  const { formState } = form;

  const parcelStatuses = [
    "Requested",
    "Approved",
    "Dispatched",
    "In Transit",
    "Delivered",
    "Canceled",
    "Blocked",
    "Unblocked",
    "Returned",
  ];

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Updating parcel status...");
    try {
      const payload = {
        currentStatus: data.currentStatus,
        note: data.note,
        location: data?.location,
      };

      await parcelStatusUpdate({ id: parcelData?._id, ...payload }).unwrap();
      //console.log(res);

      toast.success("Parcel status updated!", { id: toastId });
      form.reset({
        currentStatus: data.currentStatus,
        note: data.note,
        location: data.location,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update parcel status", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          className={`${activeRow === parcelData?._id || hoveredRow === parcelData?._id ? "bg-blue-400 text-white" : "text-blue-400"} hover:bg-blue-600 dark:hover:bg-blue-700 hover:text-white uppercase`}
        >
          <Edit2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="text-center mb-4 text-2xl uppercase">Update Parcel Status</div>
            <div className="text-start my-2">
              Tracking ID: <span className="font-light"> {parcelData?.trackingId}</span>
            </div>
            <p className="text-start my-2">
              Estimate Delivery: <span className="font-light">{new Date(parcelData?.estimatedDeliveryDate).toDateString()}</span>
            </p>
            <p className="text-start my-2">
              Sender:{" "}
              <a href={`mailto:${parcelData?.sender?.email}`} className="font-light text-primary underline">
                {parcelData?.sender?.email ?? "Unknown"}
              </a>
            </p>
            <p className="text-start my-2">
              Receiver:{" "}
              <a href={`mailto:${parcelData?.receiver?.email}`} className="font-light text-primary underline">
                {parcelData?.receiver?.email ?? "Unknown"}
              </a>
            </p>
            <p className="text-start my-2">
              From: <span className="font-light">{parcelData?.pickupAddress}</span>
            </p>
            <p className="text-start my-2">
              To: <span className="font-light">{parcelData?.deliveryAddress}</span>
            </p>

          </DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        <Form {...form}>
          <form id="status-log" className="  mt-2 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between gap-5 w-full mb-1">
              <FormField
                control={form.control}
                name="currentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Status</FormLabel>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger className="bg-white dark:bg-black dark:hover:bg-black">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {parcelStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="grow-1">
                    <FormLabel>Current Location</FormLabel>
                    <FormControl className="bg-white dark:bg-black dark:hover:bg-black">
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex justify-between gap-2 mt-2">
                  <FormLabel>Note</FormLabel>
                  <FormControl className="bg-white dark:bg-black dark:hover:bg-black">
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="uppercase" onClick={() => form.reset()}>Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="status-log"
            className="text-white uppercase"
            disabled={!formState.isDirty}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
