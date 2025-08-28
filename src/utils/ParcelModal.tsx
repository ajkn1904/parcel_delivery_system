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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ParcelModal({ tId, sender, receiver, parcelData }: { tId: string; sender: string; receiver: string; parcelData: any }) {

  const [open, setOpen] = useState(false);
  const [parcelStatusUpdate] = useUpdateParcelByAdminMutation();

  const form = useForm({
    defaultValues: {
      currentStatus: parcelData.currentStatus || "",
      //note: parcelData.note || "",
      location: parcelData.location || "",
    },
  });

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
        //note: data?.note,
        location: data?.location,
      };

      await parcelStatusUpdate({ id: parcelData._id, ...payload }).unwrap();
      //console.log(res);

      toast.success("Parcel status updated!", { id: toastId });
      form.reset({
        currentStatus: data.currentStatus,
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
          className="text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          Status <Edit2 />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Update Status of parcel
            <div className="text-start my-2">
              Tracking ID: <span className="font-light"> {tId}</span>
            </div>
            <p className="text-start my-2">
              Sender:{" "}
              <a href={`mailto:${sender}`} className="font-light text-blue-400">
                {sender}
              </a>
            </p>
            <p className="text-start my-2">
              Receiver:{" "}
              <a href={`mailto:${receiver}`} className="font-light text-blue-400">
                {receiver}
              </a>
            </p>
          </DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        <Form {...form}>
          <form id="status-log" className="flex  justify-between gap-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Current Status Dropdown */}
            <FormField
              control={form.control}
              name="currentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
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

            {/* Location Input */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grow-1">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Dhaka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note Input */}
            {/* <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="status-log"
            className="text-white"
            disabled={!formState.isDirty}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
