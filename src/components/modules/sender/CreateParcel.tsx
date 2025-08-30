/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useNavigate } from "react-router";

import { toast } from "sonner";
import { useGetAllCouponsQuery } from "@/redux/features/coupons/coupon.api";
import { useCreateParcelMutation } from "@/redux/features/parcels/parcel.api";

// === enums (sync with your backend ParcelType, DeliveryMethod, PaymentMethod) ===
const ParcelType = {
  Document: "Document",
  Box: "Box",
  Fragile: "Fragile",
  Perishable: "Perishable",
} as const;

const DeliveryMethod = {
  Regular: "Regular",
  Express: "Express",
  SameDay: "SameDay",
} as const;

const PaymentMethod = {
  CashOnDelivery: "CashOnDelivery",
  OnlinePayment: "OnlinePayment",
} as const;

// === zod schema for frontend form validation ===
const createParcelFormSchema = z.object({
  receiver: z.string().min(1, "Receiver ID is required"),
  parcelType: z.nativeEnum(ParcelType),
  weight: z.coerce.number().positive("Weight must be greater than 0"),
  deliveryMethod: z.nativeEnum(DeliveryMethod),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  deliveryDistance: z.coerce.number().nonnegative("Distance must be valid"),
  contactPhone: z
    .string()
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    }),
  estimatedDeliveryDate: z.string().min(1, "Estimated date is required"),
  paymentMethod: z.nativeEnum(PaymentMethod),
  coupon: z.string().optional(),
});

type CreateParcelFormValues = any;

export default function CreateParcel() {
  const navigate = useNavigate();
  const { parcelData } = useCreateParcelMutation(undefined);
  const { data: couponsData } = useGetAllCouponsQuery(undefined);
  const coupons = couponsData?.data ?? [];

  const form = useForm<CreateParcelFormValues>({
    resolver: zodResolver(createParcelFormSchema),
    defaultValues: {
      parcelType: ParcelType.Document,
      deliveryMethod: DeliveryMethod.Regular,
      paymentMethod: PaymentMethod.CashOnDelivery,
    },
  });

  const onSubmit = async (values: CreateParcelFormValues) => {
    try {
      // call your parcel API mutation here (not shown in your snippets)
      const res = await parcelData(values).unwrap();
      console.log(res);
      toast.success("Parcel created successfully!");
      navigate("/parcels");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create parcel");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6">Create Parcel</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Receiver */}
          <FormField
            control={form.control}
            name="receiver"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver (User ID)</FormLabel>
                <FormControl>
                  <Input placeholder="Receiver user ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parcel Type */}
          <FormField
            control={form.control}
            name="parcelType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcel Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parcel type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ParcelType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Weight in kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Method */}
          <FormField
            control={form.control}
            name="deliveryMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery method" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(DeliveryMethod).map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Address */}
          <FormField
            control={form.control}
            name="deliveryAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Address</FormLabel>
                <FormControl>
                  <Input placeholder="Delivery address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pickup Address */}
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input placeholder="Pickup address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Delivery Distance */}
          <FormField
            control={form.control}
            name="deliveryDistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Distance (km)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Distance in km" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Phone */}
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+8801XXXXXXXXX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Estimated Delivery Date */}
          <FormField
            control={form.control}
            name="estimatedDeliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Delivery Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(PaymentMethod).map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Coupon Dropdown */}
          <FormField
            control={form.control}
            name="coupon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Coupon (optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a coupon" />
                  </SelectTrigger>
                  <SelectContent>
                    {coupons.map((coupon: any) => (
                      <SelectItem key={coupon._id} value={coupon._id}>
                        {coupon.code} ({coupon.discountPercentage}% off)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
}
