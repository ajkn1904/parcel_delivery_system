/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useUpdateCouponMutation } from "@/redux/features/coupons/coupon.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const FormSchema = z.object({
    code: z.string().min(1),
    discountPercentage: z.coerce.number().min(1).max(100),
    expiryDate: z.date(),
})


export function CouponModal({ id, code, discountPercentage, expiryDate }: { id: string; code: string; discountPercentage: number; expiryDate: string }) {

    const [open, setOpen] = useState(false);
    const [couponUpdate] = useUpdateCouponMutation();

    const form = useForm<any>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: code || "",
            discountPercentage: Number(discountPercentage) || 0,
            expiryDate: new Date(expiryDate),
        },
    });

    const { formState } = form;

    const onSubmit = async (data: any) => {
        const toastId = toast.loading("Updating coupon...");
        try {
            const payload = {
                ...data,
                code: data.code,
                discountPercentage: Number(data.discountPercentage),
                expiryDate: new Date(data.expiryDate),
            };

            await couponUpdate({ id: id, ...payload }).unwrap();
            //console.log(res);

            toast.success("Coupon updated!", { id: toastId });
            form.reset({
                code: data.code,
                discountPercentage: data.discountPercentage,
                expiryDate: data.expiryDate,
            });
            setOpen(false);
        } catch (err) {
            console.error(err);
            toast.error("Failed to update coupon", { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"outline"} size="sm" className="text-blue-600 hover:bg-blue-600 hover:text-white">
                    <Edit2 />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Update Coupon
                        <div className="text-start my-2">
                            Coupon Code: <span className="font-light"> {code}</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription></DialogDescription>

                <Form {...form}>
                    <form id="status-log" className="flex flex-col  justify-between gap-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>

                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className="grow-1">
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discountPercentage"
                            render={({ field }) => (
                                <FormItem className="grow-1">
                                    <FormLabel>Discount Percentage</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col flex-1">
                                    <FormLabel>ExpiryDate Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"}className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    {field.value ? 
                                                        (format(field.value, "PPP")) 
                                                        : 
                                                        (<span>Pick a date</span>)
                                                    }
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={new Date(field.value)} onSelect={field.onChange} disabled={(date) => date <new Date(new Date().setDate(new Date().getDate() - 1))} captionLayout="dropdown"/>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => form.reset()}>Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="status-log" className="text-white" disabled={formState.isDirty}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}