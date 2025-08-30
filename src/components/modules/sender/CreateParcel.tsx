/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllReceiversQuery } from "@/redux/features/user/user.api";
import { useCreateParcelMutation } from "@/redux/features/parcels/parcel.api";
import { useGetAllCouponsQuery } from "@/redux/features/coupons/coupon.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Phone from "@/components/ui/Phone";



const createParcelFormSchema = z.object({
    receiver: z.string().min(1, "Receiver is required"),
    coupon: z.string().optional(),
    parcelType: z.enum(["Documents", "Electronics", "Clothing", "Grocery", "Other"]),
    deliveryMethod: z.enum(["Agent", "Hub"]),
    paymentMethod: z.enum(["Cash on Delivery", "Online Payment"]),
    pickupAddress: z.string().min(5, "Pickup address is too short"),
    deliveryAddress: z.string().min(5, "Delivery address is too short"),
    contactPhone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, "Invalid Bangladesh phone number"),
    weight: z.number().positive("Weight must be greater than 0"),
    deliveryDistance: z.number().nonnegative("Distance cannot be negative"),
    estimatedDeliveryDate: z.date({ error: "Estimated delivery date is required" }),
});

export default function CreateParcel() {
    const { data: receivers = [] } = useGetAllReceiversQuery({});
    const { data: coupons } = useGetAllCouponsQuery({});
    const [createParcel] = useCreateParcelMutation();
    const navigate = useNavigate();

    const form = useForm<any>({
        resolver: zodResolver(createParcelFormSchema),
        defaultValues: {
            receiver: "",
            coupon: "none",
            parcelType: "Documents",
            deliveryMethod: "Agent",
            paymentMethod: "Cash on Delivery",
            pickupAddress: "Dhaka",
            deliveryAddress: "Chittagong",
            contactPhone: "+8801234567890",
            weight: 1,
            deliveryDistance: 250,
            estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
    });

    const { control, handleSubmit } = form;

    const parcelTypes = ["Documents", "Electronics", "Clothing", "Grocery", "Other"];
    const deliveryMethods = ["Agent", "Hub"];
    const paymentMethods = ["Cash on Delivery", "Online Payment"];

    const onSubmit = async (data: any) => {
        try {
            const payload = {
                ...data,
                weight: Number(data.weight),
                deliveryDistance: Number(data.deliveryDistance),
                estimatedDeliveryDate: data.estimatedDeliveryDate.toISOString(),
            };

            if (!data.coupon || data.coupon === "none") {
                delete payload.coupon;
            } else {
                payload.coupon = data.coupon;
            }

            const res = await createParcel(payload).unwrap();
            toast.success(`Parcel created! Tracking ID: ${res.trackingId}`);
            navigate(-1);
        } catch (err: any) {
            toast.error(err.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="w-[90%] max-w-3xl mx-auto mt-8 mb-20">
            <h1 className="text-4xl font-semibold text-orange-500 dark:text-orange-400 mb-10">Create Parcel</h1>
            <div className=" p-5 border rounded-md">
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {/* Receiver*/}
                        <FormField
                            control={control}
                            name="receiver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Receiver</FormLabel>
                                    <FormControl className="w-full">
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {receivers.map((r: any) => (
                                                    <SelectItem key={r._id} value={r._id}>
                                                        {r.email}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Parcel Type & weight */}
                        <div className="flex gap-4">

                            <FormField
                                control={control}
                                name="parcelType"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Parcel Type</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select parcel type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {parcelTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
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
                                control={control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Weight (kg)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>

                        {/* Delivery Method & Payment Method */}
                        <div className="flex gap-4">
                            <FormField
                                control={control}
                                name="deliveryMethod"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Delivery Method</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select delivery method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {deliveryMethods.map((method) => (
                                                        <SelectItem key={method} value={method}>
                                                            {method}
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
                                control={control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Payment Method</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select payment method" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {paymentMethods.map((method) => (
                                                        <SelectItem key={method} value={method}>
                                                            {method}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Pickup Address */}
                        <FormField
                            control={control}
                            name="pickupAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pickup Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Pickup address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Delivery Address */}
                        <FormField
                            control={control}
                            name="deliveryAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Delivery Address</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Delivery address" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Delivery Distance & coupon*/}
                        <div className="flex gap-4">

                            <FormField
                                control={control}
                                name="deliveryDistance"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Delivery Distance (km)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={field.value || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="coupon"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Coupon</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select coupon (optional)" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">No coupon</SelectItem>
                                                    {coupons?.data?.map((c: any) => (
                                                        <SelectItem key={c._id} value={c._id}>
                                                            {c.code} ({c.discountPercentage}%)
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Estimated Delivery Date & Contact Phone */}
                        <div className="flex gap-4">
                            <FormField
                                control={control}
                                name="estimatedDeliveryDate"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Estimated Delivery Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                                                    captionLayout="dropdown"
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name="contactPhone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Contact Phone</FormLabel>
                                        <FormControl>
                                            <Phone {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-2 mt-8">
                            <Button variant={"outline"} onClick={() => navigate(-1)}>
                                <ArrowLeft className="w-4 h-4" /> BACK
                            </Button>
                            <Button type="submit" className="text-white">
                                CREATE
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
